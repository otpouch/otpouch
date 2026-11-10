import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://otpouch.app"),
  title: "口袋令牌 otpouch — 验证码，放进口袋。",
  description:
    "口袋令牌 otpouch，随身的动态验证码管理工具。微信小程序现在可用，iOS 与 Android App 开发中。支持扫码添加、搜索复制、云端管理和 Agent 授权。",
  alternates: { canonical: "https://otpouch.app" },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://otpouch.app",
    siteName: "口袋令牌 otpouch",
    title: "口袋令牌 otpouch — 验证码，放进口袋。",
    description:
      "常用账号的动态验证码，随身管理。微信小程序现在可用，iOS 与 Android App 开发中。",
    images: [
      {
        url: "/brand/otpouch-logo.png",
        width: 1254,
        height: 1254,
        alt: "口袋令牌 otpouch",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "口袋令牌 otpouch",
    description:
      "验证码，放进口袋。微信小程序现在可用，iOS 与 Android App 开发中。",
    images: ["/brand/otpouch-logo.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
