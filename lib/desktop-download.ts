const updateBase =
  "https://kmes-net-broker.botinkit.com/api/apps/otpouch-desktop/updates/stable/";

const platforms = {
  macos: { target: "darwin-aarch64", feed: "latest-mac.yml", extension: ".zip" },
  windows: { target: "windows-x86_64", feed: "latest.yml", extension: ".exe" },
} as const;

export type DesktopPlatform = keyof typeof platforms;

export function isDesktopPlatform(value: string): value is DesktopPlatform {
  return Object.hasOwn(platforms, value);
}

export async function latestDesktopDownload(
  platform: DesktopPlatform,
  fetchFeed: typeof fetch = fetch,
) {
  const { target, feed, extension } = platforms[platform];
  const response = await fetchFeed(new URL(`${target}/${feed}`, updateBase), {
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error("Desktop update feed is unavailable");
  const metadata = await response.text();
  // The official electron-updater feed uses plain or quoted scalar filenames.
  // Accept only a basename and a release version, never a URL or relative path.
  const filename = metadata.match(
    /^path:[ \t]*(["']?)([A-Za-z0-9][A-Za-z0-9._+()-]*)\1[ \t]*\r?$/m,
  )?.[2];
  const version = metadata.match(
    /^version:[ \t]*(["']?)(\d+\.\d+\.\d+(?:-[A-Za-z0-9.-]+)?)\1[ \t]*\r?$/m,
  )?.[2];
  if (!filename?.endsWith(extension) || !version)
    throw new Error("Desktop update feed has invalid release metadata");
  // Pin this request to its selected release even if stable changes mid-download.
  return new URL(
    `versions/${version}/${target}/${encodeURIComponent(filename)}`,
    updateBase,
  ).href;
}
