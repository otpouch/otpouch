"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Copy, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { siteConfig } from "@/lib/site-config";

export function GetAppDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const [imageError, setImageError] = useState(false);
  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setCopyState("idle");
      setImageError(false);
    }
    onOpenChange(nextOpen);
  }
  async function copyName() {
    try {
      await navigator.clipboard.writeText(siteConfig.name);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="get-app-dialog">
        <DialogHeader>
          <div className="dialog-logo">
            <Image
              src="/brand/otpouch-logo.png"
              width={56}
              height={56}
              alt=""
              unoptimized
            />
          </div>
          <DialogTitle>把口袋令牌，放进口袋。</DialogTitle>
          <DialogDescription>
            {siteConfig.miniProgramCode
              ? "使用微信扫一扫，打开正式版小程序。"
              : "小程序码即将上线，期待与你见面。"}
          </DialogDescription>
        </DialogHeader>
        <div className="qr-container">
          {siteConfig.miniProgramCode && !imageError ? (
            <Image
              src={siteConfig.miniProgramCode}
              alt="口袋令牌正式版微信小程序码"
              width={200}
              height={200}
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <div className="qr-placeholder">
              <div className="qr-corner corner-tl" />
              <div className="qr-corner corner-tr" />
              <div className="qr-corner corner-bl" />
              <div className="qr-corner corner-br" />
              <ScanLine size={38} strokeWidth={1.3} />
              <strong>
                {imageError ? "小程序码暂时无法加载" : "小程序码即将上线"}
              </strong>
              <span>
                {imageError ? "请稍后重新打开此窗口" : "上线后，使用微信扫一扫"}
              </span>
            </div>
          )}
        </div>
        <Button
          className="copy-name-button"
          variant="outline"
          onClick={() => void copyName()}
        >
          {copyState === "copied" ? <Check size={16} /> : <Copy size={16} />}
          {copyState === "copied" ? "已复制小程序名称" : "复制小程序名称"}
        </Button>
        <p className="dialog-note" role="status">
          {copyState === "error"
            ? "未能自动复制，请手动复制：口袋令牌"
            : "在微信内也可以长按识别小程序码。"}
        </p>
        {siteConfig.miniProgramUrl && (
          <Button asChild>
            <a
              href={siteConfig.miniProgramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              打开微信小程序
              <ArrowUpRight />
            </a>
          </Button>
        )}
        <div className="dialog-app-status">
          <div>
            <strong>iOS / Android App</strong>
            <span className="platform-status">开发中</span>
          </div>
          <p>独立 App 尚未开放下载，现在可以先使用微信小程序。</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
