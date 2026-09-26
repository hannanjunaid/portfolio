const configuredUrl = process.env.SITE_URL?.trim();
const url = new URL(configuredUrl || "http://localhost:3000");

if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
  throw new Error("SITE_URL must be an absolute HTTP(S) origin without a path, query, or credentials.");
}

export const site = {
  name: "Sohaib",
  role: "SEO Strategist",
  description: "Sohaib's portfolio as an SEO Strategist. Discover his approach to search engine optimization.",
  url,
};

export const siteTitle = `${site.name} | ${site.role}`;

// Enable for the finished production site only, never Vercel previews.
export const isIndexable = Boolean(
  configuredUrl && process.env.SITE_INDEXABLE === "true" &&
  process.env.NODE_ENV === "production" &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production") &&
  !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
);
