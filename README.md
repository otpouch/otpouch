# 口袋令牌 · OTPouch

[官网](https://otpouch.app) · [问题反馈](https://github.com/otpouch/otpouch/issues) · [MIT 许可证](LICENSE)

口袋令牌的官方宣传网站。介绍微信小程序、macOS / Windows 桌面端、开发中的 iOS / Android App，以及按账号授权的 Agent / MCP 使用方式。

本仓库开源官网的页面、交互演示和构建代码。演示使用 `example.com` 账号与合成验证码，不连接真实用户账号、OTP 密钥、业务数据库或 MCP 服务。

## 本地运行

推荐 Node.js 24，最低版本为 22.13。使用 npm 和仓库中的锁文件：

```sh
git clone https://github.com/otpouch/otpouch.git
cd otpouch
npm ci
npm run dev
```

打开 <http://localhost:5173>。本地开发无需账号、API Token 或环境文件。

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm start
```

`npm start` 使用本地 Worker 模拟器预览构建产物，地址以终端输出为准。运行和构建使用 React 19、TypeScript、Vinext / Vite、Tailwind CSS 4、shadcn/ui 与 Cloudflare 的本地开发工具。产物位于 `dist/client/` 和 `dist/server/`。

## 项目结构

| 路径 | 内容 |
| --- | --- |
| `app/` | 页面入口、元数据与全局样式 |
| `components/landing/` | 首屏、交互演示、平台说明、FAQ 和小程序入口 |
| `components/ui/` | 通用 UI 组件 |
| `lib/landing-content.ts` | 导航与 FAQ 文案 |
| `lib/site-config.ts` | 公开品牌、官网链接和小程序码配置 |
| `public/` | 图片、字体、robots.txt 与 sitemap.xml |
| `worker/index.ts` | 本地运行和构建所需的通用 Worker 入口 |
| `docs/design.md` | 设计与内容维护约定 |
| `docs/seo.md` | SEO、结构化数据与 AI 搜索内容维护 |

生产部署、CI、云账户和发布记录由独立运维项目维护，不包含在本仓库中。本仓库不绑定托管平台项目身份。

桌面端固定下载入口为 `/download/latest/macos`（Apple 芯片 ZIP）与 `/download/latest/windows`（64 位 EXE）。平台区与获取弹窗共用 `lib/site-config.ts` 中的链接。请求时读取正式 stable 更新清单，再以禁止缓存的临时重定向跳转至该次选中的版本；新 stable 发布后无需修改官网。清单不可用时返回可重试的 503，不回退到旧包。

官网提供[使用指南](https://otpouch.app/guide)、[常见问题](https://otpouch.app/faq)、[站点地图](https://otpouch.app/sitemap.xml)和可选的[纯文本内容索引](https://otpouch.app/llms.txt)。正文、结构化数据和文本索引使用同源产品说明；维护方式见 [SEO 文档](docs/seo.md)。

## 修改与贡献

欢迎提交问题和 Pull Request。修改前请阅读 [AGENTS.md](AGENTS.md)，提交前运行类型检查、lint 和构建；交互变化还需验证桌面与手机布局。

- 产品介绍应与已验证的功能一致，避免未经验证的安全承诺。
- 所有演示账号、验证码与对话都应保持为模拟数据。
- `lib/site-config.ts` 当前指向官方小程序码 `public/miniprogram-code.jpg`。用于其他产品时，请同时替换名称、图片、链接和页面元数据。
- 不要提交环境文件、凭据、真实账号备份、依赖、构建产物或临时截图。临时验证文件放在已忽略的 `deploy/uploads/`。

## 许可证

项目自有代码与文档采用 [MIT](LICENSE)。第三方代码、字体和依赖保留各自许可证，见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。品牌名称、Logo 和官方小程序码采用单独的[素材使用说明](BRAND_ASSETS.md)。
