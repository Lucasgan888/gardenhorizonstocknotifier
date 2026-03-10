# Garden Horizons Stock Notifier - 技术实施指南

> 基于 Codex (后端架构) + Gemini (UI 设计) 协作输出
>
> **核心约束**: 首页 SEO 和文案不变，核心关键词 "Garden Horizons Stock Notifier" 必须保留

---

## 📋 执行优先级

### 🔴 高优先级（立即执行）

1. **Legacy 页面 SEO 审计** - Codex 负责
2. **Hero 内嵌极简导航** - Gemini 负责（< 10 行代码）
3. **内链锚文本优化** - Codex 负责
4. **Slug 唯一性检查** - Codex 负责

### 🟡 中优先级（1 周内）

5. **移动端横向滚动卡片** - Gemini 负责
6. **BreadcrumbList Schema** - Codex 负责
7. **Robots.txt 生成** - Codex 负责

### 🟢 低优先级（可选）

8. **内页模板视觉优化** - Gemini 负责

---

## 🎯 任务分配

### Codex 任务清单

- [ ] Legacy 页面审计（7 个页面）
- [ ] Slug 唯一性检查（src/lib/content.ts）
- [ ] RelatedLinks 验证（src/lib/content.ts）
- [ ] BreadcrumbList Schema（src/lib/content.ts + content-pages.tsx）
- [ ] 内链锚文本动态生成（content-pages.tsx）
- [ ] Robots.txt 生成（src/app/robots.ts）

### Gemini 任务清单

- [ ] Hero 内嵌极简导航（src/app/page.tsx 行 285）
- [ ] 移动端横向滚动卡片（src/app/page.tsx 行 595）
- [ ] Quick Facts 序号徽章（content-pages.tsx 行 76）
- [ ] Tracking Tips 勾选图标（content-pages.tsx 行 97）
- [ ] Selection Tips 勾选图标（content-pages.tsx 行 115）

---

## 📊 Legacy 页面审计结果

### 高风险冲突（需处理）

**`/grow-a-garden-stock-tracker`**
- **冲突**: 与首页 title/H1 几乎相同
- **处理**: 添加 canonical 到首页 `/`
- **代码位置**: `src/app/grow-a-garden-stock-tracker/page.tsx`

**`/how-to-get-rare-items`**
- **冲突**: 与 `/guides/how-to-get-rare-items-fast` 高度重叠
- **处理**: 添加 canonical 到新 guide 或区分定位
- **代码位置**: `src/app/how-to-get-rare-items/page.tsx`

### 低风险（保留）

- `/beginner-guide` - 有价值的入门内容
- `/traveling-merchant` - 独特的 merchant 专题
- `/legendary-items` - legendary 集合页面
- `/garden-horizons-item-rarities` - rarity 系统说明

---

## 🔧 详细实施步骤

### 步骤 1: Slug 唯一性检查（Codex）

**文件**: `src/lib/content.ts`
**位置**: 文件末尾（第 812 行之后）

```typescript
// Slug uniqueness validation
function validateSlugUniqueness() {
  const allSlugs = new Map<string, string>();

  [...guides, ...items, ...categories].forEach((content) => {
    const existing = allSlugs.get(content.slug);
    if (existing) {
      throw new Error(
        `Duplicate slug: "${content.slug}" in ${existing} and ${content.kind}`
      );
    }
    allSlugs.set(content.slug, content.kind);
  });
}

if (process.env.NODE_ENV === "development") {
  validateSlugUniqueness();
}
```

---

### 步骤 2: Hero 内嵌极简导航（Gemini）

**文件**: `src/app/page.tsx`
**位置**: 第 285 行 `<header>` 标签之后

```tsx
{/* Minimal Navigation */}
<nav className="flex items-center justify-between mb-6">
  <a href="/" className="text-lg font-bold text-accent">GH Tracker</a>
  <div className="flex gap-6 text-sm font-medium">
    <a href="/items/lucky-clover" className="text-text-secondary hover:text-accent transition">Items</a>
    <a href="/guides/how-garden-horizons-stock-works" className="text-text-secondary hover:text-accent transition">Guides</a>
    <a href="/faq" className="text-text-secondary hover:text-accent transition">FAQ</a>
  </div>
</nav>
```

**视觉效果**: 单行，低对比度，hover 变绿色

---

### 步骤 3: 内链锚文本优化（Codex）

**文件**: `src/components/content-pages.tsx`
**位置**: 第 53 行 TrackerCta 函数

**改动前**:
```typescript
function TrackerCta() {
```

**改动后**:
```typescript
function TrackerCta({ pageType }: { pageType?: "guide" | "item" | "category" }) {
  const anchorText = pageType === "guide"
    ? "Track items mentioned in this guide"
    : pageType === "item"
    ? "Watch this item in the live tracker"
    : pageType === "category"
    ? "Browse live stock for this category"
    : "Open live stock tracker";

  return (
    // ... 在 Link 组件中使用 {anchorText}
```

**同时修改第 190 行**:
```typescript
<TrackerCta pageType={content.kind} />
```

---

### 步骤 4: BreadcrumbList Schema（Codex）

**文件 1**: `src/lib/content.ts`（第 811 行之后）

```typescript
export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
```

**文件 2**: `src/components/content-pages.tsx`（第 153-154 行之间）

```typescript
<JsonLd data={buildBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: content.kind === "guide" ? "Guides" : content.kind === "item" ? "Items" : "Categories",
    url: `${SITE_URL}/${content.kind}s` },
  { name: content.title, url: `${SITE_URL}${path}` }
])} />
```

---

### 步骤 5: Robots.txt 生成（Codex）

**创建文件**: `src/app/robots.ts`

```typescript
import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

---

### 步骤 6: 移动端横向滚动（Gemini，可选）

**文件**: `src/app/page.tsx`
**位置**: 第 595 行

**改动前**:
```tsx
<div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
```

**改动后**:
```tsx
<div className="mt-20 flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0 scrollbar-hide">
```

**每个卡片添加**:
```tsx
className="... min-w-[85vw] md:min-w-0 snap-center"
```

---

## ⚠️ 风险点和注意事项

### Codex 风险

1. **Slug 验证**: 可能暴露现有数据重复问题
2. **RelatedLinks 验证**: 可能发现死链
3. **Legacy 页面处理**: 需要逐个确认 canonical 策略

### Gemini 风险

1. **scrollbar-hide**: 需确认 Tailwind 配置支持
2. **移动端卡片宽度**: 可能需调整 85vw → 80vw/90vw
3. **导航链接**: 移动端可能换行

---

## ✅ 测试清单

### Codex 测试

- [ ] 启动开发服务器，确认无 slug 重复错误
- [ ] 检查控制台，确认 relatedLinks 验证通过
- [ ] 访问 `/robots.txt` 确认生成正确
- [ ] 使用 Google Rich Results Test 验证 BreadcrumbList
- [ ] 访问各类型页面，确认锚文本正确

### Gemini 测试

- [ ] 桌面端：Hero 导航显示正常
- [ ] 移动端：Hero 导航不换行
- [ ] 移动端：3 列卡片横向滚动流畅
- [ ] 桌面端：3 列卡片保持网格布局
- [ ] 内页：序号徽章和勾选图标对齐正确

---

## 📈 SEO 零冲突策略

| 页面类型 | 关键词定位 | 与首页关系 |
|---------|-----------|-----------|
| 首页 | stock notifier / live tracker / real-time | 品牌+工具 |
| Guide | how to / guide / tutorial | 教育支撑 |
| Item | [item name] + rarity/stats | 长尾流量 |
| Category | best/all/tier list | 目录流量 |

**核心原则**: 首页垄断 "notifier/tracker/live stock" 词群，新内容页走 "教育/信息/目录" 词群

---

## 📝 改动文件清单

### Codex 改动

1. `src/lib/content.ts` - 添加验证函数和 schema
2. `src/components/content-pages.tsx` - 修改 TrackerCta 和添加 BreadcrumbList
3. `src/app/robots.ts` - 新建文件

### Gemini 改动

1. `src/app/page.tsx` - Hero 导航 + 横向滚动
2. `src/components/content-pages.tsx` - 内页模板视觉优化

---

## 🚀 部署建议

1. **先在开发环境测试所有改动**
2. **确认无错误后提交到 Git**
3. **部署到 staging 环境验证**
4. **监控 Google Search Console 1 周**
5. **根据数据调整 legacy 页面策略**

---

## 📞 协作流程

1. **Codex 先执行高优先级任务 1-4**
2. **Gemini 执行任务 2（Hero 导航）**
3. **双方交叉测试**
4. **Codex 输出 CONTENT_AUDIT.md**
5. **根据测试结果决定是否执行中低优先级任务**

---

生成时间: 2026-03-10
协作模型: Codex (架构) + Gemini (UI)
约束条件: 首页 SEO 不变，最小化改动
