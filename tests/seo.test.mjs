import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { faqs, productFacts } from "../lib/landing-content.ts";
import { siteConfig } from "../lib/site-config.ts";
import {
  llmsText,
  pageMetadata,
  pageSchema,
  seoPages,
  serializeJsonLd,
} from "../lib/seo.ts";

test("indexable pages have unique titles and self-referencing canonical and social URLs", () => {
  const titles = new Set();
  for (const path of Object.keys(seoPages)) {
    const metadata = pageMetadata(siteConfig.url, path);
    const canonical = new URL(path, siteConfig.url).href;
    assert.equal(metadata.alternates.canonical, canonical);
    assert.equal(metadata.openGraph.url, canonical);
    assert.equal(metadata.openGraph.title, metadata.title);
    assert.equal(metadata.twitter.description, metadata.description);
    assert.ok(metadata.description.length > 30);
    titles.add(metadata.title);
  }
  assert.equal(titles.size, Object.keys(seoPages).length);
});

test("social image dimensions match the actual public asset", async () => {
  const png = await readFile(
    new URL("../public/brand/otpouch-logo.png", import.meta.url),
  );
  const image = pageMetadata(siteConfig.url, "/").openGraph.images[0];
  assert.equal(image.width, png.readUInt32BE(16));
  assert.equal(image.height, png.readUInt32BE(20));
});

test("structured data distinguishes the website source from the product and avoids invented offers", () => {
  const graph = pageSchema(siteConfig, "/", productFacts, faqs)["@graph"];
  const app = graph.find((item) => item["@type"] === "SoftwareApplication");
  const source = graph.find((item) => item["@type"] === "SoftwareSourceCode");
  assert.equal(app.runtimePlatform, "微信小程序");
  for (const key of [
    "aggregateRating",
    "review",
    "offers",
    "downloadUrl",
    "codeRepository",
    "license",
  ])
    assert.equal(app[key], undefined);
  assert.equal(source.codeRepository, siteConfig.githubUrl);
  assert.match(source.description, /不包含小程序、App 或后端/);
  assert.equal(new Set(graph.map((item) => item["@id"])).size, graph.length);
});

test("FAQ schema and text index contain exactly the same published answers and anchors", () => {
  const page = pageSchema(siteConfig, "/faq", productFacts, faqs)[
    "@graph"
  ].find((item) => item["@type"] === "FAQPage");
  assert.equal(page.mainEntity.length, faqs.length);
  const text = llmsText(siteConfig, productFacts, faqs);
  faqs.forEach((faq, index) => {
    const question = page.mainEntity[index];
    assert.equal(question.name, faq.question);
    assert.equal(question.acceptedAnswer.text, faq.answer);
    assert.equal(
      question["@id"],
      `${siteConfig.url}/faq#question-${index + 1}`,
    );
    assert.ok(text.includes(question["@id"]));
    assert.ok(text.includes(faq.answer));
  });
});

test("JSON-LD serialization cannot close its script element", () => {
  const hostile = { description: '</script><script>alert("test")</script>' };
  const serialized = serializeJsonLd(hostile);
  assert.ok(!serialized.includes("<"));
  assert.deepEqual(JSON.parse(serialized), hostile);
});

test("sitemap lists canonical content pages and robots advertises that sitemap", async () => {
  const sitemap = await readFile(
    new URL("../public/sitemap.xml", import.meta.url),
    "utf8",
  );
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );
  assert.deepEqual(
    urls.sort(),
    Object.keys(seoPages)
      .map((path) => new URL(path, siteConfig.url).href)
      .sort(),
  );
  assert.equal(urls.length, new Set(urls).size);
  const robots = await readFile(
    new URL("../public/robots.txt", import.meta.url),
    "utf8",
  );
  assert.match(robots, /User-agent: \*\s+Allow: \//);
  assert.ok(robots.includes(`Sitemap: ${siteConfig.url}/sitemap.xml`));
});
