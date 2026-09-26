// src/app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Montserrat, JetBrains_Mono } from "next/font/google";
import { AnimatedBackground } from "@/components/background/AnimatedBackground";
import { ScrollDirectionProvider } from "@/components/motion/ScrollDirectionProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";
import { siteUrl } from "@/utils/siteUrl";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const title = {
  default: "Ishara Dhanushan's Portfolio",
  template: "%s | Ishara Dhanushan",
};
const description =
  "Ishara Dhanushan's software engineering portfolio, featuring full-stack applications, REST APIs, backend systems, and mobile projects.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Ishara Dhanushan",
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "University of Kelaniya",
    "Sri Lanka Software Engineer",
  ],
  authors: [{ name: "Ishara Dhanushan", url: siteUrl }],
  creator: "Ishara Dhanushan",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Ishara Dhanushan",
    title: title.default,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: title.default,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${montserrat.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <PersonJsonLd />
        <AnimatedBackground />

        <ScrollDirectionProvider>
          <div className="relative z-10 flex min-h-full flex-col">
            <Header />
            {children}
            <Footer />
          </div>
        </ScrollDirectionProvider>
      </body>
    </html>
  );
}
