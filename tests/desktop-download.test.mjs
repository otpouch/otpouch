import assert from "node:assert/strict";
import test from "node:test";
import {
  isDesktopPlatform,
  latestDesktopDownload,
} from "../lib/desktop-download.ts";

test("latest links resolve each platform's current stable release without caching", async () => {
  for (const [platform, target, feed, file] of [
    ["macos", "darwin-aarch64", "latest-mac.yml", "OTPouch-0.3.1-mac-arm64.zip"],
    ["windows", "windows-x86_64", "latest.yml", "OTPouch-0.3.1-win-x64.exe"],
  ]) {
    let version = "0.3.1";
    const fetchFeed = async (url, options) => {
      assert.ok(url.href.endsWith(`/stable/${target}/${feed}`));
      assert.equal(options.cache, "no-store");
      return new Response(`path: '${file.replace("0.3.1", version)}'\nversion: "${version}"\n`);
    };
    const first = await latestDesktopDownload(platform, fetchFeed);
    assert.ok(first.endsWith(`/stable/versions/0.3.1/${target}/${file}`));
    version = "0.4.0";
    const next = await latestDesktopDownload(platform, fetchFeed);
    assert.ok(next.endsWith(`/stable/versions/0.4.0/${target}/${file.replace("0.3.1", version)}`));
  }
});

test("unknown platforms and invalid feeds cannot become a download redirect", async () => {
  for (const platform of ["linux", "__proto__", "constructor", "toString"])
    assert.equal(isDesktopPlatform(platform), false);
  for (const path of ["https://example.com/install.zip", "../install.zip", "wrong.exe"])
    await assert.rejects(latestDesktopDownload("macos", async () => new Response(`path: ${path}\nversion: 0.3.1\n`)));
  await assert.rejects(latestDesktopDownload("macos", async () => new Response("path: install.zip\nversion: nope\n")));
  await assert.rejects(latestDesktopDownload("macos", async () => new Response("", { status: 503 })));
  await assert.rejects(latestDesktopDownload("windows", async () => { throw new Error("offline"); }));
});

test("transient origin failures retry the live feed once and permanent failures stop", async () => {
  for (const firstFailure of [
    () => { throw new DOMException("timeout", "TimeoutError"); },
    () => new Response("unavailable", { status: 503 }),
  ]) {
    let calls = 0;
    const location = await latestDesktopDownload("macos", async (_url, options) => {
      assert.equal(options.cache, "no-store");
      if (++calls === 1) return firstFailure();
      return new Response("path: OTPouch-0.4.0-mac-arm64.zip\nversion: 0.4.0\n");
    });
    assert.equal(calls, 2);
    assert.ok(location.endsWith("/versions/0.4.0/darwin-aarch64/OTPouch-0.4.0-mac-arm64.zip"));
  }
  let calls = 0;
  await assert.rejects(latestDesktopDownload("windows", async () => {
    calls++;
    throw new Error("offline");
  }));
  assert.equal(calls, 2);
});
