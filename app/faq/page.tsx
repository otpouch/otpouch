import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";
import { StructuredData } from "@/components/structured-data";
import { faqs, productFacts } from "@/lib/landing-content";
import { pageMetadata, pageSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const metadata: Metadata = pageMetadata(siteConfig.url, "/faq");

export default function FAQ() {
  return (
    <>
      <StructuredData
        value={pageSchema(siteConfig, "/faq", productFacts, faqs)}
      />
      <ContentPage
        title="口袋令牌常见问题"
        label="常见问题"
        intro="关于 TOTP 动态验证码、微信小程序、离线使用条件、备份迁移和 Agent 授权的直接回答。"
      >
        {faqs.map((faq, index) => (
          <section key={faq.question} aria-labelledby={`question-${index + 1}`}>
            <h2 id={`question-${index + 1}`}>{faq.question}</h2>
            <p>{faq.answer}</p>
          </section>
        ))}
        <p>
          需要具体操作步骤？查看<a href="/guide">使用指南</a>，或
          <a href={`${siteConfig.githubUrl}/issues`}>反馈官网内容问题</a>
          。反馈时请勿附上 OTP 密钥、账号备份或授权凭证。
        </p>
      </ContentPage>
    </>
  );
}
