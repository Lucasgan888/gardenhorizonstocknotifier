# Cloudflare Worker 部署指南

## 架构

- 前端：Vercel / Next.js
- 实时数据代理：独立 Cloudflare Worker
- 上游数据源：`https://gardenhorizonslivestock.com:3010/api/data`

## 1. 本地开发

```bash
cd worker
npm install
npx wrangler dev
```

本地测试：

```bash
curl http://127.0.0.1:8787/stock
```

## 2. 部署到 Cloudflare

1. 登录：

```bash
npx wrangler login
```

2. 创建 KV：

```bash
npx wrangler kv:namespace create "STOCK_KV"
npx wrangler kv:namespace create "STOCK_KV" --preview
```

3. 把返回的 `id` 和 `preview_id` 写入 `worker/wrangler.jsonc`

4. 部署：

```bash
npx wrangler deploy
```

## 3. 部署后验证

```bash
curl https://garden-stock-worker.<your-account>.workers.dev/stock
```

成功时会返回统一的库存 JSON，并带有 `meta.state` / `meta.source` / `meta.next_update_at`。

## 4. 更新前端环境变量

在 Vercel 或本地 `.env.local` 中设置：

```bash
STOCK_API_URL=https://garden-stock-worker.<your-account>.workers.dev/stock
```

## 5. 失败回退行为

- Worker 优先返回最新的实时数据
- 上游短暂失败时，Worker 会优先返回 KV 里的缓存，并标记 `meta.state = "stale"`
- 如果既没有实时数据也没有缓存，Worker 才返回 `503`
