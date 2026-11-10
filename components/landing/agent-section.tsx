import {
  ArrowRight,
  Bot,
  Check,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

export function AgentSection() {
  return (
    <section className="agent-section" id="agents">
      <div className="section-shell agent-layout">
        <div className="agent-copy">
          <span className="section-kicker">A LITTLE HELP FROM YOUR AGENT.</span>
          <span className="agent-label">
            <Bot size={15} />
            支持 MCP 接入
          </span>
          <h2>
            你的 Agent，
            <br />
            也能搭把手。
          </h2>
          <p>
            把需要的账号授权给 AI
            Agent，让它在工作流中按需取码。哪些账号、用多久，由你决定。
          </p>
          <ul>
            <li>
              <Check size={15} />
              按账号选择授权范围
            </li>
            <li>
              <Check size={15} />
              设置期限，随时撤销
            </li>
            <li>
              <Check size={15} />
              复制完整接入提示词，即可交给 Agent
            </li>
          </ul>
          <a className="text-link" href="#agent-guide">
            看看如何接入
            <ArrowRight size={16} />
          </a>
        </div>
        <div className="agent-visual">
          <div className="agent-window">
            <div className="agent-window-bar">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
              <span>Agent · 工作流示意</span>
              <Bot size={14} />
            </div>
            <div className="chat-body">
              <div className="chat-user">帮我获取工作账号的验证码。</div>
              <div className="chat-tool">
                <span>
                  <span className="tool-status" />
                  <span>口袋令牌 MCP</span>
                  <Check size={12} />
                </span>
                <p>查找已授权账号</p>
                <p>获取当前验证码</p>
              </div>
              <div className="chat-response">
                <span className="agent-avatar">
                  <Sparkles size={15} />
                </span>
                <div>
                  <span>已找到 GitHub 工作账号。</span>
                  <div className="agent-code">
                    482 951<span>示例验证码</span>
                  </div>
                  <p>仅获取已授权账号，不返回 OTP 密钥。</p>
                </div>
              </div>
            </div>
            <div className="agent-window-bottom">
              <ShieldCheck size={13} />
              <span>授权范围由你掌控</span>
              <SlidersHorizontal size={13} />
            </div>
          </div>
          <span className="agent-visual-caption">
            演示对话，非实际 Agent 请求
          </span>
        </div>
        <div className="agent-guide" id="agent-guide">
          <span className="guide-label">三步接入</span>
          {[
            {
              number: "01",
              title: "打开 Agent 授权",
              text: "小程序「我的 → Agent 授权」",
            },
            {
              number: "02",
              title: "选账号，设期限",
              text: "只授权工作流需要的账号",
            },
            {
              number: "03",
              title: "复制给你的 Agent",
              text: "妥善保管仅显示一次的接入提示词",
            },
          ].map((step) => (
            <div key={step.number}>
              <span>{step.number}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
