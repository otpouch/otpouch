"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Cloud,
  Copy,
  KeyRound,
  ScanLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/landing-content";
import { siteConfig } from "@/lib/site-config";
import { AppDemo } from "./app-demo";
import { Header } from "./header";
import { GetAppDialog } from "./get-app-dialog";
import { Features } from "./features";
import { AgentSection } from "./agent-section";
import { Platforms } from "./platforms";
import { GitHubIcon } from "./github-icon";

export function LandingPage() {
  const [getAppOpen, setGetAppOpen] = useState(false);
  const openApp = () => setGetAppOpen(true);
  return (
    <>
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>
      <div id="top" />
      <Header onGetApp={openApp} />
      <main id="main">
        <section className="hero section-shell">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <KeyRound size={15} aria-hidden="true" />
              <span>随身的动态验证码管理工具</span>
            </div>
            <h1>
              验证码，
              <br />
              <span>放进口袋。</span>
            </h1>
            <p className="hero-description">
              口袋令牌（OTPouch），随身的 TOTP 双重验证管理工具。
              <br />
              微信小程序现在可用，iOS 与 Android App 正在开发中。
            </p>
            <div className="hero-actions">
              <Button onClick={openApp} className="primary-cta">
                使用微信小程序
                <ArrowUpRight size={18} />
              </Button>
              <a className="secondary-cta" href="#platforms">
                了解 App
                <ArrowDown size={15} />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="tiny-dot" />
              微信小程序 · 现在可用
              <span className="note-divider" />
              iOS / Android App · 开发中
            </div>
            <div className="hero-bottom-note">
              <KeyRound size={15} aria-hidden="true" />
              <span>Little codes. Right in your pocket.</span>
            </div>
          </div>
          <AppDemo onGetApp={openApp} />
        </section>
        <div className="benefit-strip">
          <div className="section-shell">
            <span>
              <ScanLine size={17} />
              扫码添加
            </span>
            <span>
              <Copy size={17} />
              轻点复制
            </span>
            <span>
              <Cloud size={17} />
              云端管理
            </span>
            <span>
              <Bot size={17} />
              Agent 协作
            </span>
          </div>
        </div>
        <Platforms onGetMiniapp={openApp} />
        <Features />
        <AgentSection />
        <section className="faq-section section-shell" id="faq">
          <div className="faq-heading">
            <span className="section-kicker">GOOD TO KNOW.</span>
            <h2>你可能还想知道。</h2>
            <p>开始使用前，把这些小事说清楚。</p>
            <div className="resource-links">
              <a href="/guide">
                使用指南 <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              <a href="/faq">
                查看全部问题 <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
          <Accordion type="single" collapsible className="faq-list">
            {faqs.map((faq, index) => (
              <AccordionItem value={`faq-${index}`} key={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent forceMount>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <section className="closing-section section-shell">
          <div className="closing-content">
            <div>
              <span className="section-kicker">ALWAYS WITHIN REACH.</span>
              <h2>
                下一次登录，
                <br />
                从口袋里拿个码。
              </h2>
            </div>
            <div>
              <p>
                少一点翻找，多一点顺手。
                <br />
                先从微信小程序开始，App 正在开发中。
              </p>
              <Button className="primary-cta" onClick={openApp}>
                使用微信小程序
                <ArrowUpRight size={18} />
              </Button>
            </div>
          </div>
          <div className="closing-wordmark" aria-hidden="true">
            otpouch<span>·</span>
          </div>
        </section>
      </main>
      <footer className="site-footer section-shell">
        <span>© {new Date().getFullYear()} 口袋令牌 · otpouch</span>
        <div>
          <span>验证码，放进口袋。</span>
          <a href="/guide">使用指南</a>
          <a href="/faq">常见问题</a>
          <a
            className="github-link"
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub 开源仓库（新窗口打开）"
            title="GitHub 开源仓库"
          >
            <GitHubIcon />
          </a>
          <a href="https://otpouch.app" aria-label="otpouch.app 官网">
            otpouch.app
            <ArrowUpRight size={12} />
          </a>
        </div>
      </footer>
      <GetAppDialog open={getAppOpen} onOpenChange={setGetAppOpen} />
    </>
  );
}
