import {
  isDesktopPlatform,
  latestDesktopDownload,
} from "@/lib/desktop-download";

export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "no-store" };

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ platform: string }> },
) {
  const { platform } = await params;
  if (!isDesktopPlatform(platform))
    return new Response("不支持的下载平台。", { status: 404, headers });

  try {
    const location = await latestDesktopDownload(platform);
    return new Response(null, {
      status: 307,
      headers: { ...headers, Location: location },
    });
  } catch (error) {
    console.error(
      "Desktop download resolution failed",
      platform,
      error instanceof Error ? error.message : "Unknown feed error",
    );
    return new Response(
      "暂时无法获取最新安装包，请稍后重试。返回官网：https://otpouch.app/#platforms",
      {
        status: 503,
        headers: {
          ...headers,
          "Content-Type": "text/plain; charset=utf-8",
          "Retry-After": "60",
        },
      },
    );
  }
}
