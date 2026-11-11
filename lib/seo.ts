/** Shared, public search metadata. Keep facts aligned with the visible product pages. */
export const seoPages = {
  "/": {
    title: "口袋令牌 OTPouch｜TOTP 动态验证码与双重验证管理",
    description:
      "口袋令牌（OTPouch）是一款 TOTP 动态验证码管理工具。微信小程序、macOS 与 Windows 桌面端现在可用，官网提供最新稳定版下载。支持双重验证（2FA）账号管理、JSON 备份和 Agent / MCP 按账号授权。iOS 与 Android App 开发中。",
    label: "首页",
  },
  "/guide": {
    title: "使用指南：添加 TOTP 账号、备份与 MCP 授权｜口袋令牌 OTPouch",
    description:
      "口袋令牌微信小程序使用指南：扫描官方小程序码，添加 TOTP 双重验证账号，搜索和复制验证码，导入导出 JSON 备份，以及按账号授权 AI Agent 通过 MCP 取码。",
    label: "使用指南",
  },
  "/faq": {
    title: "常见问题：离线取码、账号备份与开源范围｜口袋令牌 OTPouch",
    description:
      "了解口袋令牌（OTPouch）支持的 TOTP 账号、微信小程序与 App 状态、离线使用条件、JSON 迁移、24 小时回收站、官网开源范围和 Agent / MCP 授权边界。",
    label: "常见问题",
  },
} as const;

type Site = {
  name: string;
  englishName: string;
  url: string;
  githubUrl: string;
};
type Question = { question: string; answer: string };
type Fact = { label: string; value: string };
type PagePath = keyof typeof seoPages;

export function pageMetadata(origin: string, path: PagePath) {
  const page = seoPages[path];
  const url = new URL(path, origin).href;
  const images = [
    {
      url: "/brand/otpouch-logo.png",
      width: 1254,
      height: 1254,
      alt: "口袋令牌 OTPouch",
    },
  ];
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website" as const,
      locale: "zh_CN",
      siteName: "口袋令牌 OTPouch",
      url,
      title: page.title,
      description: page.description,
      images,
    },
    twitter: {
      card: "summary" as const,
      title: page.title,
      description: page.description,
      images: ["/brand/otpouch-logo.png"],
    },
  };
}

export function pageSchema(
  site: Site,
  path: PagePath,
  facts: readonly Fact[],
  questions: readonly Question[],
) {
  const origin = new URL("/", site.url).href;
  const url = new URL(path, origin).href;
  const page = seoPages[path];
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": origin + "#website",
      url: origin,
      name: "口袋令牌 OTPouch",
      alternateName: [site.name, site.englishName],
      inLanguage: "zh-CN",
    },
    {
      "@type": path === "/faq" ? "FAQPage" : "WebPage",
      "@id": url + "#webpage",
      url,
      name: page.title,
      description: page.description,
      inLanguage: "zh-CN",
      isPartOf: { "@id": origin + "#website" },
      about: { "@id": origin + "#application" },
      ...(path === "/faq"
        ? {
            mainEntity: questions.map((q, index) => ({
              "@type": "Question",
              "@id": url + "#question-" + (index + 1),
              name: q.question,
              acceptedAnswer: { "@type": "Answer", text: q.answer },
            })),
          }
        : {}),
      ...(path !== "/" ? { breadcrumb: { "@id": url + "#breadcrumb" } } : {}),
    },
  ];
  if (path === "/") {
    graph.push(
      {
        "@type": "SoftwareApplication",
        "@id": origin + "#application",
        name: "口袋令牌 OTPouch",
        alternateName: [site.name, site.englishName],
        url: origin,
        applicationCategory: "SecurityApplication",
        runtimePlatform: ["微信小程序", "macOS", "Windows"],
        inLanguage: "zh-CN",
        description: page.description,
        featureList: facts.map((fact) => fact.value),
        softwareHelp: { "@id": new URL("/guide", origin).href + "#webpage" },
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": origin + "#website-source",
        name: "OTPouch 官网源码",
        description:
          "官网页面、交互演示与构建代码，不包含小程序、App 或后端源码。",
        codeRepository: site.githubUrl,
        license: site.githubUrl + "/blob/main/LICENSE",
        programmingLanguage: ["TypeScript", "CSS"],
        isPartOf: { "@id": origin + "#website" },
      },
    );
  } else {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": url + "#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: origin },
        { "@type": "ListItem", position: 2, name: page.label, item: url },
      ],
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function llmsText(
  site: Site,
  facts: readonly Fact[],
  questions: readonly Question[],
) {
  return [
    "# 口袋令牌 OTPouch",
    "",
    "> " + seoPages["/"].description,
    "",
    "## 官方页面",
    "",
    ...Object.entries(seoPages).map(
      ([path, page]) =>
        `- [${page.label}](${new URL(path, site.url).href}): ${page.description}`,
    ),
    `- [官网源码](${site.githubUrl}): 官网自有代码采用 MIT 许可证；小程序、App 和后端不在该公开仓库中。`,
    "",
    "## 产品事实",
    "",
    ...facts.map((fact) => `- ${fact.label}：${fact.value}`),
    "",
    "## 常见问题",
    "",
    ...questions.flatMap((q, index) => [
      `### ${q.question}`,
      "",
      q.answer,
      "",
      `原文：${new URL("/faq", site.url).href}#question-${index + 1}`,
      "",
    ]),
  ].join("\n");
}
