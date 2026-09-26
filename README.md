# Sohaib's portfolio

Next.js App Router portfolio for Sohaib, SEO Strategist.

## Hero section

The homepage currently reproduces the supplied heynesh.com hero reference,
including its demo wording, statistics, portrait, and links, as requested.
The site's SEO identity remains Sohaib; personalize the demo content before launch.

- `components/hero/content.ts`: text, statistics, portrait paths, navigation, and CTA URLs.
- `components/hero/hero.module.css`: scoped styles, desktop/tablet/mobile layouts,
  colors, spacing, typography, and entrance animation timings. The variables at the
  top control the desktop composition; the mobile media query provides overrides.
- `components/hero/icons.ts`: reference SVG wordmark and badge geometry.
- `public/images/`: supplied desktop portrait and the reference's mobile crop.
- `public/fonts/`: locally served reference fonts, loaded through `next/font/local`.

The hero is a Server Component with CSS entrance animations and a native HTML
mobile menu. It adds no client animation package. `getImageProps` and a `picture`
element deliver only the matching responsive portrait. Reduced-motion preferences
disable animation, and all content remains available with JavaScript disabled.
Mobile skips the desktop entrance sequence, following the live reference.

The desktop headline uses the supplied screenshot's larger size; the live site
currently caps it at 88px. The full site's scroll-to-sidebar transition is outside
this standalone hero. Demo links to sections not yet built resolve to the reference
site; replace them with local anchors when those portfolio sections are added.

## Development

Run `npm install`, then `npm run dev`. Open http://localhost:3000.
Run `npm run lint` and `npm run build` before shipping.

## SEO configuration

Edit `lib/site.ts` for the name, role, and description shared by page content,
metadata, and social cards. Copy `.env.example` to `.env.local` and configure the
same environment variables on your host **before building**:

- `SITE_URL`: your final public origin, including HTTPS, without a path.
- `SITE_INDEXABLE`: keep `false` while building; set `true` for launch.
- `GOOGLE_SITE_VERIFICATION`: optional Search Console verification token.

Rebuild after changes. Without a domain or launch flag, pages emit `noindex` and
the sitemap stays empty. Development and Vercel preview deployments stay
`noindex`; on other hosts keep `SITE_INDEXABLE=false` in staging. Robots allows
crawling so search engines can read the noindex tag.

Implemented: title template, description, author, page canonical, Open Graph and
Twitter metadata, generated 1200x630 social cards, Person JSON-LD, robots.txt,
sitemap.xml, English document language, semantic main/H1, and next/font.

## Before launch

- Replace the coming-soon content with real services, projects, and experience.
- Update the description to accurately summarize the finished page.
- Replace the starter `app/favicon.ico` with your own branding.
- Set the production domain and enable indexing, then rebuild.
- Verify `/robots.txt`, `/sitemap.xml`, canonical URLs, and both social images.
- Verify ownership in Google Search Console and submit `/sitemap.xml`.
- Test the finished page on mobile, check accessibility and Core Web Vitals,
  and validate JSON-LD with Schema Markup Validator.
- Configure HTTPS and redirects for alternative domains with your hosting provider.

For each new public route, add its own title, description, canonical, and Open
Graph URL using the Metadata API, then add its URL to `app/sitemap.ts`. Next.js
replaces nested metadata objects, so include the shared fields when overriding
`openGraph`. Add descriptive image alt text and use `next/image` with dimensions
(or fill plus sizes) for content imagery. Use actual content modification dates
if you add sitemap `lastModified`; don't stamp every page with the build date.

References: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
and the version-matched guides in `node_modules/next/dist/docs/`.
