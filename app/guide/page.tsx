import type { Metadata } from "next";
import Image from "next/image";
import { ContentPage } from "@/components/content-page";
import { StructuredData } from "@/components/structured-data";
import { faqs, guideSections, productFacts } from "@/lib/landing-content";
import { pageMetadata, pageSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const metadata: Metadata = pageMetadata(siteConfig.url, "/guide");

export default function Guide() {
  return (
    <>
      <StructuredData
        value={pageSchema(siteConfig, "/guide", productFacts, faqs)}
      />
      <ContentPage
        title="口袋令牌使用指南"
        label="使用指南"
        intro="从添加第一个 TOTP 账号，到备份和 Agent 授权。这里介绍微信小程序的使用方式与当前产品边界。"
      >
        <section aria-labelledby="overview">
          <h2 id="overview">口袋令牌能做什么？</h2>
          <dl className="product-facts">
            {productFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <nav className="content-toc" aria-label="本页目录">
          <span>快速查找</span>
          {guideSections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </nav>
        {guideSections.map((section) => (
          <section key={section.id} aria-labelledby={section.id}>
            <h2 id={section.id}>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.id === "start" && siteConfig.miniProgramCode && (
              <figure className="guide-code">
                <Image
                  src={siteConfig.miniProgramCode}
                  width={180}
                  height={180}
                  alt="使用微信扫描口袋令牌官方小程序码"
                  unoptimized
                />
                <figcaption>使用微信扫码打开口袋令牌</figcaption>
              </figure>
            )}
          </section>
        ))}
        <section aria-labelledby="more">
          <h2 id="more">更多说明与来源</h2>
          <p>
            离线使用、回收站、App 开发状态和开源范围，见
            <a href="/faq">常见问题</a>。TOTP 算法的定义可参考{" "}
            <a href="https://www.rfc-editor.org/rfc/rfc6238">RFC 6238</a>。
          </p>
          <p>
            官网源码与交互演示位于{" "}
            <a href={siteConfig.githubUrl}>github.com/otpouch/otpouch</a>
            。官网演示使用模拟账号和验证码，不连接真实用户数据。
          </p>
        </section>
      </ContentPage>
    </>
  );
}
