import { faqs, productFacts } from "@/lib/landing-content";
import { llmsText } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsText(siteConfig, productFacts, faqs), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
