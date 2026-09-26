import type { MetadataRoute } from "next";
import { isIndexable, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Crawlers must be able to read noindex on unfinished deployments.
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(isIndexable && { sitemap: new URL("/sitemap.xml", site.url).href }),
  };
}
