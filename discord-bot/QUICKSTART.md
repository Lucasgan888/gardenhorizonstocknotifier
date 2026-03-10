# 🚀 快速启动指南

## 先看这个前提

- `CHANNEL_ID` 只是告诉 Bot 去监听哪个频道，不会给 Bot 自动开权限。
- 目标频道必须属于 **Bot 已加入并且有权访问的服务器**。
- 如果库存频道在别人的服务器里，必须由对方服务器管理员邀请你的 Bot，并给它频道权限。
- `https://discord.com/channels/<server_id>/@home` 是服务器首页，不是可监听的频道 ID。

## 第一步：创建 Discord Bot（5分钟）

1. 打开 https://discord.com/developers/applications
2. 点击 `New Application` → 命名为 `GH-Stock-Bot`
3. 左侧点击 `Bot` → `Add Bot`
4. **复制 Token**（保存好，只显示一次）
5. 开启权限：
   - ✅ `MESSAGE CONTENT INTENT`

## 第二步：邀请 Bot 到目标服务器（2分钟）

1. 左侧点击 `OAuth2 → URL Generator`
2. 勾选 Scopes: `bot`
3. 勾选权限（`permissions=68608`）:
   - `View Channels`
   - `Read Message History`
4. 复制生成的 URL，浏览器打开，选择 **库存频道所在的服务器**

**快速邀请链接格式**：

```text
https://discord.com/oauth2/authorize?client_id=你的CLIENT_ID&permissions=68608&scope=bot
```

`CLIENT_ID` 在 Application 页面的 `Application ID`。

如果下拉列表里看不到目标服务器，通常表示：

- 你的 Discord 账号没有该服务器的 `Manage Server` 权限
- 你需要把邀请链接发给对方服务器管理员，让对方代为邀请

## 第三步：给 Bot 目标频道权限（1分钟）

1. 在 Discord 中右键目标库存频道 → `编辑频道`
2. 打开 `权限`
3. 添加 `GH-Stock-Bot`
4. 开启：
   - `查看频道`
   - `读取消息历史`

如果 Bot 已经在服务器里，但启动日志出现 `Missing Access`，基本就是这一步没配好。

## 第四步：获取频道 ID（1分钟）

1. Discord 设置 → 高级 → 开启 `开发者模式`
2. 打开 **真正发库存消息的文本频道**（不要停留在 `@home`）
3. 右键点击该频道 → `复制 ID`
4. **多频道监听**：如需监听多个频道，用逗号分隔 ID

示例：

- 链接 `https://discord.com/channels/1392614350686130198/1474848965030576168`
- 其中 `1474848965030576168` 才是 `CHANNEL_ID`

## 第五步：配置并启动 Bot（5分钟）

```bash
# 1. 进入 Bot 目录
cd discord-bot

# 2. 安装依赖
npm install

# 3. 创建配置文件
cp .env.example .env

# 4. 编辑 .env 文件，填入：
#    DISCORD_TOKEN=你的Bot Token
#    CHANNEL_ID=1474848965030576168
#    PORT=3001
#
#    单频道示例: CHANNEL_ID=1474848965030576168
#    多频道示例: CHANNEL_ID=1474848965030576168,1474799504401236090

# 5. 启动 Bot
npm start
```

看到下面这些日志说明基本正常：

- `✅ Bot logged in`
- `📡 Monitoring channels: ...`
- `📥 Scanned ... recent messages ...`

如果看到 `❌ Missing Access ...`，说明 Bot 还没拿到目标频道权限。

## 第六步：启动网站（1分钟）

```bash
# 回到项目根目录
cd ..

# 首次运行先安装网站依赖
npm install

# 启动 Next.js
npm run dev
```

访问 `http://localhost:3000` 查看效果。

如果你把 Bot 端口改成了不是 `3001`，还需要在网站根目录配置：

```env
DISCORD_BOT_URL=http://localhost:你的端口/api/stock
```

## 调试消息解析

- Bot 现在会处理普通消息、Bot 消息和 webhook/embed 文本。
- 启动时会扫描最近 25 条历史消息并尝试回填缓存。
- 如果频道消息格式和示例不同，继续修改 `discord-bot/index.js` 里的 `parseStockMessage()`。

## Windows 长期运行

```bash
# 安装 pm2
npm install -g pm2

# 启动 Bot（自动重启）
cd discord-bot
pm2 start index.js --name gh-bot
pm2 save
pm2 startup
```

另外记得关闭系统睡眠。

## 常见问题

- `Bot 收不到消息`：检查 `MESSAGE CONTENT INTENT` 是否开启
- `Missing Access`：Bot 不在目标服务器里，或没有目标频道的 `查看频道` / `读取消息历史`
- `API 返回空数据`：频道最近消息没匹配到库存格式，或 `CHANNEL_ID` 不是实际发库存的频道
- `端口冲突`：修改 `discord-bot/.env` 里的 `PORT`，同时同步设置网站的 `DISCORD_BOT_URL`
