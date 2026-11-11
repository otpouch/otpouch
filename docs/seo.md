# SEO 与 AI 搜索内容维护

官网首页、`/guide` 使用指南与 `/faq` 常见问题均输出完整 HTML 正文，并分别设置标题、描述、canonical、Open Graph 与 Twitter 元数据。首页 FAQ 即使折叠也保留服务端正文；独立 FAQ 页面直接展开全部回答。

帮助页面之间使用原生页面链接，支持不执行 JavaScript 时的站内导航。

## 内容来源

- `lib/site-config.ts`：官网地址、公开仓库和官方小程序码。
- `lib/landing-content.ts`：FAQ、产品事实和使用步骤。可见正文、FAQ 结构化数据与纯文本索引共用这些内容。
- `lib/seo.ts`：各页元数据、WebSite / WebPage / SoftwareApplication / SoftwareSourceCode / FAQPage / BreadcrumbList 结构化数据，以及安全的 JSON-LD 序列化。
- `public/robots.txt` 与 `public/sitemap.xml`：抓取入口与三个规范页面。新增可索引页面时同步维护站点地图。
- `/llms.txt`：可选的纯文本导航和产品事实摘要，链接回可见原文。它是补充索引，不是搜索引擎或 AI 收录、引用的保证。

产品公开状态必须以验证过的能力为准：不虚构评分、价格、用户量、运营者身份或下载地址。公开仓库开源的是官网源码，不代表小程序、App 和后端已开源。离线使用须保留版本支持、账号已加载和本机已有缓存的前提，不能把开发版本上传回执当成所有用户已获得正式版本的证明。

## 验证

使用推荐的 Node.js 24，运行 `npm test`、`npm run typecheck`、`npm run lint`、`npm run build`。构建前会自动运行 SEO 回归检查。

发布后核验：

1. 三个页面返回 200，各自只有一个对应 canonical、一个 H1，JSON-LD 可解析且与可见正文一致。
2. FAQ 回答与指南正文在未执行 JavaScript 的响应 HTML 中存在；手机布局和折叠交互正常。
3. `robots.txt`、`sitemap.xml`、`llms.txt` 正确返回；不存在的路径返回 404。
4. 通过常见搜索爬虫 User-Agent 做访问冒烟检查。此检查不能证明真实爬虫 IP 一定可通过 CDN/WAF。

已验证站点的所有者可在 Google Search Console 与 Bing Webmaster Tools 提交 `https://otpouch.app/sitemap.xml`，观察收录、搜索表现和可用的 AI 引用报告。验证 Token 由所有者提供，不填写占位值，不为了提交普通内容使用仅适用于特定内容类型的 Indexing API。

参考：[Google AI 搜索说明](https://developers.google.com/search/docs/appearance/ai-features)、[Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)、[Schema.org FAQPage](https://schema.org/FAQPage)。结构化数据帮助表达页面内容，不保证获得富结果或 AI 引用。
