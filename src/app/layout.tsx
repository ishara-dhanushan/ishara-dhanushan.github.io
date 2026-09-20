// src/app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Montserrat, JetBrains_Mono } from "next/font/google";
import { AnimatedBackground } from "@/components/background/AnimatedBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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

export const metadata: Metadata = {
  title: {
    default: "Ishara Dhanushan — Software Engineer",
    template: "%s | Ishara Dhanushan",
  },
  description:
    "Ishara Dhanushan's software engineering portfolio, featuring full-stack applications, REST APIs, backend systems, and mobile projects.",
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
        <AnimatedBackground />

        <div className="relative z-10 flex min-h-full flex-col">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
