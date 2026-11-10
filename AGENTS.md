# OTPouch 官网维护约定

- 本仓库维护口袋令牌 / OTPouch 的公开官网源码，规范域名为 `https://otpouch.app`。
- 保持 React、TypeScript、Vinext / Vite、Tailwind CSS 4 和少量 shadcn/ui 的现有技术栈。推荐 Node.js 24，使用 npm 与 `package-lock.json`。
- 页面组件位于 `components/landing/`，文案位于 `lib/landing-content.ts`，公开入口位于 `lib/site-config.ts`。
- 保持现有黑白灰配色、Logo 和响应式布局；未经要求不进行视觉改版。
- 演示账号使用 `example.com` 和合成数字，不连接真实 OTP 数据、业务数据库或 Agent 凭证。
- 营销文案应以已验证的产品功能为依据，不宣称未经验证的加密、安全认证或离线能力。
- 当前官方小程序码为 `public/miniprogram-code.jpg`。缺失或加载失败时明确提示，不生成假码。
- 运行 `npm run typecheck`、`npm run lint`、`npm run build`。涉及页面交互时验证桌面与手机布局、搜索、复制、FAQ 和弹窗。
- 不提交依赖、构建产物、运行状态、环境文件、凭据或真实账号备份。临时截图和检查结果放在已忽略的 `deploy/uploads/`。
- 不在本仓库加入生产部署配置、CI 发布脚本、云账户信息或托管平台项目身份。
- 保留 `LICENSE`、第三方许可证及 `BRAND_ASSETS.md` 的素材范围说明。
- Git 远端不嵌入凭据，检查时避免输出本机地址重写附带的认证信息。
- 用户未要求时不提交、推送或触发发布。
