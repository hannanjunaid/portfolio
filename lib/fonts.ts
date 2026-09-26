import localFont from "next/font/local";

export const displayFont = localFont({
  src: [
    { path: "../public/fonts/tr3a-regular.woff2", weight: "400" },
    { path: "../public/fonts/tr3a-medium.woff2", weight: "500" },
    { path: "../public/fonts/tr3a-bold.woff2", weight: "700" },
  ],
  variable: "--hero-font-display",
  display: "swap",
});

export const faqQuestionFont = localFont({
  src: "../public/fonts/tr3a-medium.woff2",
  weight: "600",
  variable: "--faq-font-question",
  display: "swap",
});

export const bodyFont = localFont({
  src: "../public/fonts/neue-montreal-book.woff2",
  weight: "400",
  variable: "--hero-font-body",
  display: "swap",
});

export const labelFont = localFont({
  src: "../public/fonts/neue-montreal-bold.woff2",
  weight: "700",
  variable: "--about-font-label",
  display: "swap",
});
