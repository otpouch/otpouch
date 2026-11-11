/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation keeps these Vinext help pages usable without client routing. */
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { GitHubIcon } from "./landing/github-icon";

export function ContentPage({
  title,
  label,
  intro,
  children,
}: {
  title: string;
  label: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="/" aria-label="口袋令牌 OTPouch 首页">
            <Image
              src="/brand/otpouch-logo.png"
              width={36}
              height={36}
              alt=""
              unoptimized
            />
            <span>otpouch</span>
          </a>
          <nav className="content-nav" aria-label="帮助导航">
            <a
              href="/guide"
              aria-current={label === "使用指南" ? "page" : undefined}
            >
              使用指南
            </a>
            <a
              href="/faq"
              aria-current={label === "常见问题" ? "page" : undefined}
            >
              常见问题
            </a>
          </nav>
        </div>
      </header>
      <main id="main" className="content-page section-shell">
        <nav className="content-breadcrumb" aria-label="面包屑">
          <a href="/">首页</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{label}</span>
        </nav>
        <header className="content-heading">
          <h1>{title}</h1>
          <p>{intro}</p>
        </header>
        <article className="content-article">{children}</article>
      </main>
      <footer className="site-footer section-shell">
        <span>© {new Date().getFullYear()} 口袋令牌 · otpouch</span>
        <div>
          <a href="/">返回首页</a>
          <a href="/guide">使用指南</a>
          <a href="/faq">常见问题</a>
          <a
            className="github-link"
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub 开源仓库"
            aria-label="GitHub 开源仓库（新窗口打开）"
          >
            <GitHubIcon />
          </a>
        </div>
      </footer>
    </>
  );
}
