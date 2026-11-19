import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // Embeds are the same labs as the explainer pages, shown inside other sites.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/embed/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
