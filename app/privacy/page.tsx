import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";
import policy from "@/lib/privacy-policy.json";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const metadata: Metadata = pageMetadata(siteConfig.url, "/privacy");

export default function Privacy() {
  return (
    <ContentPage
      title={policy.title}
      label="隐私政策"
      intro={`更新日期：${policy.version}。本页与 App 内展示相同版本的隐私政策。`}
    >
      <nav className="content-toc" aria-label="隐私政策目录">
        <span>本页目录</span>
        {policy.sections.map((section, index) => (
          <a key={section.title} href={`#section-${index + 1}`}>
            {section.title}
          </a>
        ))}
        <a href="#contact">公开联系方式</a>
      </nav>
      {policy.sections.map((section, index) => (
        <section key={section.title} aria-labelledby={`section-${index + 1}`}>
          <h2 id={`section-${index + 1}`}>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
      <section aria-labelledby="contact">
        <h2 id="contact">公开联系方式</h2>
        <p>运营者：{policy.operatorName}</p>
        <p>
          隐私联系邮箱：
          <a href={`mailto:${policy.contactEmail}`}>{policy.contactEmail}</a>
        </p>
        <p>
          申请更正、删除或咨询隐私问题时，请勿通过邮件发送 OTP 密钥、验证码、
          密码、账号备份或 Agent 授权凭证。
        </p>
      </section>
    </ContentPage>
  );
}
