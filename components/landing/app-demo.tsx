"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleHelp,
  Copy,
  Ellipsis,
  KeyRound,
  Search,
  Signal,
  UserRound,
  Wifi,
  X,
} from "lucide-react";

const demoAccounts = [
  {
    issuer: "GitHub",
    account: "hello@example.com",
    note: "工作账号",
    initials: "GH",
    code: 482951,
  },
  {
    issuer: "Google",
    account: "hello@example.com",
    note: "日常使用",
    initials: "G",
    code: 736204,
  },
  {
    issuer: "Cloudflare",
    account: "hello@example.com",
    note: "我的网站",
    initials: "C",
    code: 159832,
  },
];

type ClipboardState = { id: string; status: "copied" | "error" } | null;

export function AppDemo({ onGetApp }: { onGetApp: () => void }) {
  const [query, setQuery] = useState("");
  const [tick, setTick] = useState(0);
  const [tab, setTab] = useState<"codes" | "profile">("codes");
  const [clipboard, setClipboard] = useState<ClipboardState>(null);
  const remaining = 30 - ((tick + 6) % 30);
  const cycle = Math.floor((tick + 6) / 30);
  const accounts = demoAccounts.filter((account) =>
    `${account.issuer} ${account.account} ${account.note}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!clipboard) return;
    const timer = window.setTimeout(() => setClipboard(null), 2400);
    return () => window.clearTimeout(timer);
  }, [clipboard]);

  async function copyCode(issuer: string, code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setClipboard({ id: issuer, status: "copied" });
    } catch {
      setClipboard({ id: issuer, status: "error" });
    }
  }

  return (
    <div className="demo-stage">
      <div className="stage-annotation annotation-top">
        <span className="annotation-line" />
        需要时，顺手打开
      </div>
      <div className="phone" aria-label="口袋令牌小程序交互演示">
        <div className="phone-status" aria-hidden="true">
          <span>9:41</span>
          <div>
            <Signal size={13} />
            <Wifi size={13} />
            <span className="battery" />
          </div>
        </div>
        <div className="phone-nav">
          <span>{tab === "codes" ? "验证码" : "我的"}</span>
          <span className="wechat-capsule" aria-hidden="true">
            <Ellipsis size={18} />
            <i />
            <span className="capsule-dot" />
          </span>
        </div>
        <div className="phone-body">
          {tab === "codes" ? (
            <>
              <div className="demo-search">
                <Search size={15} aria-hidden="true" />
                <input
                  aria-label="搜索演示账号"
                  placeholder="搜索发行方、账号或备注"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  maxLength={200}
                />
                {query && (
                  <button aria-label="清空搜索" onClick={() => setQuery("")}>
                    <X size={13} />
                  </button>
                )}
              </div>
              <div className="demo-accounts">
                {accounts.map((account) => {
                  const code = String(
                    (account.code + cycle * 137429) % 1000000,
                  ).padStart(6, "0");
                  const active = clipboard?.id === account.issuer;
                  return (
                    <button
                      key={account.issuer}
                      className="demo-account"
                      onClick={() => void copyCode(account.issuer, code)}
                      aria-label={`复制 ${account.issuer} 示例验证码`}
                    >
                      <span className="demo-account-top">
                        <span className="issuer-avatar">
                          {account.initials}
                        </span>
                        <span className="account-meta">
                          <strong>{account.issuer}</strong>
                          <span>{account.account}</span>
                        </span>
                        <span className="demo-note">{account.note}</span>
                      </span>
                      <span className="demo-account-bottom">
                        <span className="demo-code">
                          {code.slice(0, 3)}
                          <span> </span>
                          {code.slice(3)}
                        </span>
                        <span
                          className={`timer ${remaining < 10 ? "timer-warning" : ""}`}
                        >
                          <svg viewBox="0 0 36 36" aria-hidden="true">
                            <circle
                              className="timer-track"
                              cx="18"
                              cy="18"
                              r="15"
                            />
                            <circle
                              className="timer-progress"
                              cx="18"
                              cy="18"
                              r="15"
                              pathLength="100"
                              strokeDasharray={`${(remaining / 30) * 100} 100`}
                            />
                          </svg>
                          <span>{remaining}</span>
                        </span>
                      </span>
                      <span
                        aria-hidden={!active}
                        className={`copy-feedback ${active ? "is-visible" : ""}`}
                      >
                        {active && clipboard.status === "error" ? (
                          "请手动选取示例验证码"
                        ) : (
                          <>
                            <Check size={13} />
                            已复制示例验证码
                          </>
                        )}
                      </span>
                    </button>
                  );
                })}
                {!accounts.length && (
                  <div className="demo-empty">
                    <Search size={24} />
                    <strong>没有找到匹配账号</strong>
                    <p>试试 GitHub、工作账号或邮箱。</p>
                    <button onClick={() => setQuery("")}>清空搜索</button>
                  </div>
                )}
              </div>
              <button
                className="demo-add"
                aria-label="了解如何添加账号"
                onClick={onGetApp}
              >
                +
              </button>
            </>
          ) : (
            <div className="demo-profile">
              <div className="profile-avatar">
                <UserRound size={30} />
              </div>
              <strong>口袋里的日常</strong>
              <span>把验证码，放在顺手的地方。</span>
              <div className="profile-stats">
                <div>
                  <strong>3</strong>
                  <span>示例账号</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>发行方</span>
                </div>
              </div>
              {["备份与导入", "回收站", "Agent 授权"].map((text) => (
                <button key={text} onClick={onGetApp}>
                  {text}
                  <ChevronRight size={15} />
                </button>
              ))}
              <small>官网交互演示</small>
            </div>
          )}
        </div>
        <div className="phone-tabs">
          <button
            className={tab === "codes" ? "active" : ""}
            onClick={() => setTab("codes")}
            aria-pressed={tab === "codes"}
          >
            <KeyRound size={19} />
            <span>验证码</span>
          </button>
          <button
            className={tab === "profile" ? "active" : ""}
            onClick={() => setTab("profile")}
            aria-pressed={tab === "profile"}
          >
            <UserRound size={19} />
            <span>我的</span>
          </button>
        </div>
        <div className="phone-home" aria-hidden="true">
          <span />
        </div>
      </div>
      <div className="stage-callout">
        <span className="callout-icon">
          <Copy size={18} />
        </span>
        <span>
          <strong>轻点一下，即可复制</strong>
          <small>少一点切换，多一点顺手。</small>
        </span>
        <ArrowUpRight size={15} />
      </div>
      <p className="demo-caption">
        <CircleHelp size={12} />
        可交互演示 · 账号与验证码均为示例
      </p>
      <div className="sr-only" role="status">
        {clipboard?.status === "copied"
          ? "示例验证码已复制"
          : clipboard?.status === "error"
            ? "复制未成功，请手动选取示例验证码"
            : ""}
      </div>
    </div>
  );
}
