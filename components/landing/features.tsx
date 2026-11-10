import {
  ArrowDownToLine,
  CheckCheck,
  Cloud,
  Copy,
  ScanLine,
  Search,
  TimerReset,
} from "lucide-react";

export function Features() {
  return (
    <section className="features-section section-shell" id="features">
      <div className="section-heading">
        <div>
          <span className="section-kicker">LESS FRICTION. MORE FOCUS.</span>
          <h2>
            登录的小事，
            <br />
            顺手就好。
          </h2>
        </div>
        <p>
          从添加到取码，把每一步做得更直接。
          <br />
          让注意力回到你真正要做的事上。
        </p>
      </div>
      <div className="feature-layout">
        <article className="feature-main">
          <div className="feature-heading">
            <span className="feature-icon">
              <Search size={20} />
            </span>
            <span className="feature-number">01 / FIND & COPY</span>
          </div>
          <h3>账号再多，也能一眼找到。</h3>
          <p>
            发行方、账号、备注都能搜。找到需要的验证码，
            <br className="desktop-break" />
            轻点复制，不必来回确认。
          </p>
          <div
            className="search-illustration"
            aria-label="按备注搜索工作账号的功能示意"
          >
            <div className="illustration-search">
              <Search size={17} />
              <span>工作</span>
              <span className="search-shortcut">备注也能搜</span>
            </div>
            <div className="illustration-result">
              <span className="issuer-avatar">GH</span>
              <div>
                <strong>GitHub</strong>
                <span>hello@example.com</span>
              </div>
              <span className="work-tag">工作账号</span>
              <span className="result-code">482 951</span>
              <Copy size={16} />
            </div>
            <div className="illustration-hint">
              <CheckCheck size={14} />
              找得到，也拿得快。
            </div>
          </div>
        </article>
        <div className="feature-side">
          <article>
            <span className="feature-icon">
              <ScanLine size={20} />
            </span>
            <div>
              <span className="feature-number">02 / ADD</span>
              <h3>扫一下，添个新账号。</h3>
              <p>
                扫描 OTP 二维码，或手动输入密钥。
                <br />
                熟悉的方式，轻松开始。
              </p>
            </div>
          </article>
          <article>
            <span className="feature-icon">
              <TimerReset size={20} />
            </span>
            <div>
              <span className="feature-number">03 / KNOW</span>
              <h3>还剩多久，心里有数。</h3>
              <p>
                倒计时圆环显示有效期，临近换码时提醒。
                <br />
                每一次取用，都看得明白。
              </p>
            </div>
          </article>
        </div>
      </div>
      <div className="care-row">
        <article>
          <Cloud size={21} />
          <div>
            <h3>账号集中在云端</h3>
            <p>联网读取云端账号，日常管理少一点负担。</p>
          </div>
        </article>
        <article>
          <ArrowDownToLine size={21} />
          <div>
            <h3>备份，给自己留一份</h3>
            <p>JSON 导入导出，先预览，再合并去重。</p>
          </div>
        </article>
        <article>
          <TimerReset size={21} />
          <div>
            <h3>误删，还有反悔的时间</h3>
            <p>24 小时回收站，为手滑留一点余地。</p>
          </div>
        </article>
      </div>
    </section>
  );
}
