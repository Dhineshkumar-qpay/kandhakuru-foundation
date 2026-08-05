import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalEventPopup from "@/components/GlobalEventPopup";
import { AuthProvider } from "@/context/AuthContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sri Kandhaguru Foundation | The Way of Life",
  description:
    "Guide visitors toward inner peace, self-realization, and holistic well-being through the timeless wisdom of Shiva Kriya Yogam.",
  openGraph: {
    title: "Sri Kandhaguru Foundation",
    description: "The Way of Life - Shiva Kriya Yogam",
    type: "website",
  },
};

import { LanguageProvider } from "@/i18n/LanguageContext";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = "G-N1VYRL0HZR";
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <GlobalEventPopup />
          </AuthProvider>
        </LanguageProvider>
      </body>

      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </html>
  );
}
