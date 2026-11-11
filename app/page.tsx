import { LandingPage } from "@/components/landing/landing-page";
import { StructuredData } from "@/components/structured-data";
import { faqs, productFacts } from "@/lib/landing-content";
import { siteConfig } from "@/lib/site-config";
import { pageSchema } from "@/lib/seo";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <StructuredData value={pageSchema(siteConfig, "/", productFacts, faqs)} />
      <LandingPage />
    </>
  );
}
