"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigation } from "@/lib/landing-content";

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="口袋令牌 otpouch 首页">
      <Image
        src="/brand/otpouch-logo.png"
        width={36}
        height={36}
        alt=""
        unoptimized
      />
      <span>
        otpouch<span className="brand-chinese">口袋令牌</span>
      </span>
    </a>
  );
}

export function Header({ onGetApp }: { onGetApp: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="主导航">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <Button className="header-cta" onClick={onGetApp}>
            获取口袋令牌
            <ArrowUpRight size={14} />
          </Button>
          <button
            className="mobile-menu-toggle"
            aria-label={menuOpen ? "关闭导航" : "打开导航"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          className="mobile-nav"
          aria-label="移动导航"
          id="mobile-navigation"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <ArrowUpRight size={15} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
