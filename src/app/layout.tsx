import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Purview | Multi-State Privacy Compliance for SMBs",
  description:
    "Free scan — find out exactly which privacy laws apply to your business. Get a compliance checklist and fix legal blind spots in minutes, no legal degree required.",
  metadataBase: new URL("https://getpurview.com"),
  openGraph: {
    title: "Purview | Multi-State Privacy Compliance",
    description:
      "Scan your website in 10 seconds. Discover which of 20+ state privacy laws apply to your business and get a step-by-step compliance checklist.",
    type: "website",
    url: "https://getpurview.com",
    siteName: "Purview",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Purview — Multi-State Privacy Compliance Dashboard for SMBs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Purview | Multi-State Privacy Compliance for SMBs",
    description:
      "Free scan — find out which of 20+ state privacy laws apply to your business. Step-by-step compliance checklist, no legal degree required.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://getpurview.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
