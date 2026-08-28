import type { Metadata } from "next";
import { headingFont, bodyFont } from "@/lib/fonts";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { SITE, SERVICES } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Contractors Choice Agency`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ["workers comp Louisiana", "Louisiana workers compensation", "LA WC insurance", "LWCC", "workers comp contractor Louisiana", "construction workers comp Louisiana"],
  authors: [{ name: "Contractors Choice Agency" }],
  creator: "Contractors Choice Agency",
  publisher: "Contractors Choice Agency",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Contractors Choice Agency`,
    description: "Louisiana workers' compensation insurance for contractors, construction, restaurants, and small businesses. LWCC-compliant. Same-day certificates.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: `${SITE.name} — Louisiana workers' compensation insurance` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Contractors Choice Agency`,
    description: "Louisiana workers' compensation insurance for contractors, construction, restaurants, and small businesses. LWCC-compliant. Same-day certificates.",
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: SITE.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: "+18449675247",
    email: SITE.email,
    image: `${SITE.url}/images/og-image.jpg`,
    logo: `${SITE.url}/images/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: SITE.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: 33.2622, longitude: -111.7826 },
    employee: { "@type": "Person", name: "Josh Cotner", jobTitle: "Founder & Insurance Agent" },
    areaServed: { "@type": "Country", name: "United States" },
    // Derived from the real service list so this can't drift back out of sync with the site.
    serviceType: SERVICES.map((s) => s.metaTitle.split(" | ")[0]),
  };

  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
