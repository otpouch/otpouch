import { ArrowUpRight, MessageCircle, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Platforms({ onGetMiniapp }: { onGetMiniapp: () => void }) {
  return (
    <section
      className="platform-section section-shell"
      id="platforms"
      aria-labelledby="platform-heading"
    >
      <div className="section-heading">
        <div>
          <span className="section-kicker">IN YOUR POCKET.</span>
          <h2 id="platform-heading">
            在微信里，
            <br />
            也在 App 里。
          </h2>
        </div>
        <p>
          小程序轻便即用，独立 App 正在开发。
          <br />
          选择适合自己的使用方式。
        </p>
      </div>
      <div className="platform-list">
        <article className="platform-option">
          <div className="platform-heading">
            <h3>
              <MessageCircle size={20} aria-hidden="true" />
              微信小程序
            </h3>
            <span className="platform-status">现在可用</span>
          </div>
          <p>
            无需单独安装。使用微信扫描正式版小程序码，集中管理账号，搜索并复制动态验证码。
          </p>
          <Button className="primary-cta" onClick={onGetMiniapp}>
            使用微信小程序
            <ArrowUpRight size={16} />
          </Button>
        </article>
        <article className="platform-option">
          <div className="platform-heading">
            <h3>
              <Smartphone size={20} aria-hidden="true" />
              独立 App
            </h3>
            <span className="platform-status">开发中</span>
          </div>
          <p>
            面向 iOS 与 Android 的独立
            App，计划与小程序共用邮箱账号和云端令牌数据。
          </p>
          <Button variant="outline" className="platform-app-button" disabled>
            iOS / Android · 尚未开放下载
          </Button>
        </article>
      </div>
    </section>
  );
}
