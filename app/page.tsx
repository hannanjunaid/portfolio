import type { Metadata } from "next";
import { site, siteTitle } from "@/lib/site";
import { HannanHero } from "@/components/hannan-hero/hannan-hero";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { Projects } from "@/components/projects/projects";
import { WhatYouGet } from "@/components/what-you-get/what-you-get";
import { Services } from "@/components/services/services";
import { Clients } from "@/components/clients/clients";
import { Faq } from "@/components/faq/faq";
import { Footer } from "@/components/footer/footer";
import { SectionTransition } from "@/components/section-transition";

// Set canonicals per page so future routes don't inherit the homepage URL.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "en_US", siteName: site.name,
    title: siteTitle, description: site.description, url: "/",
  },
};

export default function Home() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    ...(process.env.SITE_URL && { url: site.url.href }),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      <HannanHero />
      <Hero />
      <SectionTransition />
      <About />
      <Projects />
      <WhatYouGet />
      <Services />
      <Clients />
      <Faq />
      <Footer />
    </main>
  );
}
