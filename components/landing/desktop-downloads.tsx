import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function DesktopDownloads() {
  return (
    <div className="desktop-downloads">
      <Button asChild variant="outline" className="platform-app-button">
        <a href={siteConfig.desktopDownloads.macos}>
          <Download size={16} aria-hidden="true" />
          macOS · Apple 芯片
        </a>
      </Button>
      <Button asChild variant="outline" className="platform-app-button">
        <a href={siteConfig.desktopDownloads.windows}>
          <Download size={16} aria-hidden="true" />
          Windows · 64 位
        </a>
      </Button>
    </div>
  );
}
