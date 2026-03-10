# Garden Horizons Discord Bot

Discord bot that monitors official Garden Horizons stock updates and provides HTTP API for the website.

## Setup Guide

### 1. Create Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" → Name it (e.g., `GH-Stock-Bot`)
3. Go to "Bot" tab → Click "Add Bot"
4. **Copy the Token** (you'll need this for `.env`)
5. Enable these Privileged Gateway Intents:
   - ✅ MESSAGE CONTENT INTENT
   - ✅ SERVER MEMBERS INTENT

### 2. Invite Bot to Server

1. Go to "OAuth2 → URL Generator"
2. Select Scopes: `bot`
3. Select Bot Permissions:
   - ✅ Read Messages/View Channels
   - ✅ Read Message History
4. Copy the generated URL and open in browser
5. Select your server and authorize

### 3. Get Channel ID

1. In Discord: Settings → Advanced → Enable "Developer Mode"
2. Right-click the stock channel → Copy ID

### 4. Install Dependencies

```bash
cd discord-bot
npm install
```

### 5. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
DISCORD_TOKEN=your_bot_token_here
CHANNEL_ID=your_channel_id_here
PORT=3001
```

### 6. Run the Bot

**Development:**
```bash
npm start
```

**Production (with pm2):**
```bash
npm install -g pm2
pm2 start index.js --name gh-bot
pm2 save
pm2 startup
```

## API Endpoints

- `GET http://localhost:3001/api/stock` - Get current stock data
- `GET http://localhost:3001/health` - Health check

## Customize Message Parser

Edit `parseStockMessage()` in `index.js` based on actual Discord message format.

Example message formats to handle:
- "Bill has restocked: Sunflower Seeds x30, Carrot Seeds x10"
- "Molly's shop updated: Golden Watering Can x1"

## Troubleshooting

**Bot not receiving messages:**
- Check MESSAGE CONTENT INTENT is enabled
- Verify CHANNEL_ID is correct
- Ensure bot has permission to view the channel

**API returns empty data:**
- Bot needs to receive at least one message first
- Check console logs for parsing errors

## Windows Long-term Running

1. Disable sleep: Control Panel → Power Options → Never sleep
2. Use pm2 for auto-restart:
```bash
pm2 start index.js --name gh-bot
pm2 startup
pm2 save
```
