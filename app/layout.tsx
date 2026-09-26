import type { Metadata } from "next";
import "./globals.css";
import { isIndexable, site, siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: site.url,
  title: { default: siteTitle, template: `%s | ${site.name}` },
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website", locale: "en_US", siteName: site.name,
    title: siteTitle, description: site.description,
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: site.description },
  robots: {
    index: isIndexable, follow: true,
    ...(isIndexable && { googleBot: { index: true, follow: true, "max-image-preview": "large" as const } }),
  },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
