/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const rawChannelIds = process.env.CHANNEL_ID || '';
const CHANNEL_IDS = rawChannelIds.split(',').map(id => id.trim()).filter(Boolean);
const PORT = process.env.PORT || 3001;

if (!process.env.DISCORD_TOKEN) {
  console.error('❌ Missing DISCORD_TOKEN in discord-bot/.env');
  process.exit(1);
}

if (CHANNEL_IDS.length === 0) {
  console.error('❌ Missing CHANNEL_ID in discord-bot/.env');
  process.exit(1);
}

const app = express();
app.use(cors());

// Initialize SQLite database
const dbPath = path.join(__dirname, '..', 'stock.db');
const db = new Database(dbPath);

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS stock (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    emoji TEXT,
    updated_at TEXT NOT NULL
  )
`);

function createEmptyStockCache() {
  return {
    updated_at: new Date().toISOString(),
    data: {
      seed: { items: [], countdown: null },
      egg: { items: [], countdown: null },
      gear: { items: [], countdown: null },
      honey: { items: [], countdown: null },
      cosmetics: { items: [], countdown: null },
      travelingmerchant: { items: [], countdown: null, status: 'unknown' }
    }
  };
}

let stockCache = createEmptyStockCache();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

function extractMessageText(message) {
  const parts = [];

  if (message.content) {
    parts.push(message.content);
  }

  for (const embed of message.embeds ?? []) {
    if (embed.title) {
      parts.push(embed.title);
    }

    if (embed.description) {
      parts.push(embed.description);
    }

    for (const field of embed.fields ?? []) {
      if (field.name) {
        parts.push(field.name);
      }

      if (field.value) {
        parts.push(field.value);
      }
    }
  }

  return parts.join('\n').trim();
}

function detectCategory(content, channelName = '') {
  const haystack = `${content}\n${channelName}`.toLowerCase();

  if (haystack.includes('traveling merchant') || haystack.includes('travelling merchant') || haystack.includes('merchant')) {
    return 'travelingmerchant';
  }

  if (haystack.includes('cosmetic') || haystack.includes('skin') || haystack.includes('crate')) {
    return 'cosmetics';
  }

  if (haystack.includes('honey')) {
    return 'honey';
  }

  if (haystack.includes('gear') || haystack.includes('tool')) {
    return 'gear';
  }

  if (haystack.includes('egg')) {
    return 'egg';
  }

  if (haystack.includes('seed')) {
    return 'seed';
  }

  return 'seed';
}

function parseStockMessage(content, options = {}) {
  if (!content || !content.trim()) {
    return null;
  }

  const normalized = content
    .replace(/\r/g, '\n')
    .replace(/\*\*/g, '')
    .replace(/__/g, '')
    .replace(/`/g, '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();

  const npcMatch = normalized.match(/^(.*?)(?:\s+has\s+restocked|\s+shop\s+updated|\s+stock\s+updated|\s+restock(?:ed)?|\s+stock)\b/im);
  const npc = npcMatch ? npcMatch[1].trim() : 'Unknown';
  const itemRegex = /([A-Za-z0-9][A-Za-z0-9'()&/+\- ]{1,}?)\s*(?:x|×)\s*(\d{1,4})/g;
  const items = [];
  const seen = new Set();

  let match = itemRegex.exec(normalized);
  while (match) {
    const name = match[1].replace(/^[\s\-–—•:*]+/, '').trim();
    const quantity = Number.parseInt(match[2], 10);

    if (name && !Number.isNaN(quantity)) {
      const key = `${name.toLowerCase()}::${quantity}`;

      if (!seen.has(key)) {
        seen.add(key);
        items.push({
          name,
          quantity,
          emoji: '📦'
        });
      }
    }

    match = itemRegex.exec(normalized);
  }

  if (items.length === 0) {
    return null;
  }

  return {
    npc,
    items,
    category: detectCategory(normalized, options.channelName)
  };
}

function applyParsedStock(parsed, options = {}) {
  const category = parsed.category || detectCategory('', options.channelName);
  const existingCategory = stockCache.data[category] || { items: [], countdown: null };

  stockCache.updated_at = new Date(options.timestamp || Date.now()).toISOString();
  stockCache.data[category] = {
    ...existingCategory,
    items: parsed.items
  };

  // Write to database
  const deleteStmt = db.prepare('DELETE FROM stock WHERE category = ?');
  deleteStmt.run(category);

  const insertStmt = db.prepare('INSERT INTO stock (category, name, quantity, emoji, updated_at) VALUES (?, ?, ?, ?, ?)');
  for (const item of parsed.items) {
    insertStmt.run(category, item.name, item.quantity, item.emoji || '📦', stockCache.updated_at);
  }

  console.log(`✅ ${category} stock updated from ${options.source || 'message'}: ${parsed.items.length} items`);
}

function formatChannelError(channelId, error) {
  if (!error?.message) {
    return `Unknown error for channel ${channelId}`;
  }

  if (error.message === 'Missing Access') {
    return `Missing Access for channel ${channelId}. Invite the bot to the target server and grant View Channels + Read Message History.`;
  }

  return error.message;
}

async function hydrateChannel(channel) {
  const messages = await channel.messages.fetch({ limit: 25 });
  const sortedMessages = [...messages.values()].sort((left, right) => left.createdTimestamp - right.createdTimestamp);
  let parsedCount = 0;

  for (const message of sortedMessages) {
    const messageText = extractMessageText(message);
    const parsed = parseStockMessage(messageText, { channelName: channel.name });

    if (!parsed) {
      continue;
    }

    applyParsedStock(parsed, {
      channelName: channel.name,
      source: `history:${channel.id}`,
      timestamp: message.createdTimestamp
    });
    parsedCount += 1;
  }

  console.log(`📥 Scanned ${messages.size} recent messages in #${channel.name}; parsed ${parsedCount}`);
}

client.once('clientReady', async () => {
  console.log(`✅ Bot logged in as ${client.user.tag}`);
  console.log(`📡 Monitoring channels: ${CHANNEL_IDS.join(', ')}`);

  for (const channelId of CHANNEL_IDS) {
    try {
      const channel = await client.channels.fetch(channelId);

      if (!channel?.isTextBased()) {
        console.log(`ℹ️ Skipping non-text channel ${channelId}`);
        continue;
      }

      await hydrateChannel(channel);
    } catch (error) {
      console.error(`❌ ${formatChannelError(channelId, error)}`);
    }
  }
});

client.on('messageCreate', (message) => {
  if (!CHANNEL_IDS.includes(message.channelId)) {
    return;
  }

  if (message.author?.id === client.user?.id) {
    return;
  }

  const messageText = extractMessageText(message);
  if (!messageText) {
    return;
  }

  console.log(`📨 New message in ${message.channelId} from ${message.author?.tag || message.webhookId || 'unknown'}`);

  const parsed = parseStockMessage(messageText, { channelName: message.channel?.name });
  if (!parsed) {
    console.log('ℹ️ Message received but no stock items matched the parser');
    return;
  }

  applyParsedStock(parsed, {
    channelName: message.channel?.name,
    source: `live:${message.channelId}`,
    timestamp: message.createdTimestamp
  });
});

app.get('/api/stock', (req, res) => {
  res.json(stockCache);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    bot: client.user?.tag || 'not ready',
    channels: CHANNEL_IDS,
    updated_at: stockCache.updated_at
  });
});

app.listen(PORT, () => {
  console.log(`🚀 HTTP API running on http://localhost:${PORT}`);
});

client.login(process.env.DISCORD_TOKEN).catch((error) => {
  console.error(`❌ Discord login failed: ${error.message}`);
  process.exit(1);
});
