import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { LanguageProvider } from "@/i18n";
import MotionProvider from "@/components/motion/MotionProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileBar from "@/components/layout/StickyMobileBar";
import ToastContainer from "@/components/layout/ToastContainer";
import { ConsentBanner } from "@/components/layout/ConsentBanner";

export const metadata: Metadata = {
  title: "V.V Properties Coimbatore | Verified Plots & Residential Land",
  description:
    "Verified clear-title DTCP & TNRERA approved residential plots and villa communities across Coimbatore's prime growth corridors.",
  metadataBase: new URL("https://vvpropertiescbe.com"),
  keywords: [
    "V.V Properties",
    "V.V Properties Coimbatore",
    "Plots in Saravanampatti",
    "Plots near CHIL SEZ IT Park",
    "Plots in Kovilpalayam",
    "DTCP Approved plots in Coimbatore",
    "RERA approved plots Coimbatore",
    "Tech Valley Coimbatore",
    "The Garden City Kovilpalayam",
    "Coimbatore real estate",
  ],
  openGraph: {
    title: "V.V Properties Coimbatore | Verified land. Thoughtfully planned.",
    description: "Verified clear title DTCP & TNRERA approved residential plots in Coimbatore.",
    url: "https://vvpropertiescbe.com",
    siteName: "V.V Properties",
    images: [
      {
        url: "/brand/vv-properties-logo.jpg",
        width: 800,
        height: 800,
        alt: "V.V Properties Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/brand/vv-properties-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&family=Noto+Sans+Tamil:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ivory text-ink font-sans antialiased selection:bg-ink selection:text-ivory">
        <LanguageProvider>
          <MotionProvider>
            <AppProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main id="main" className="flex-grow w-full overflow-x-hidden">
                  {children}
                </main>
                <Footer />
                <StickyMobileBar />
                <ToastContainer />
                <ConsentBanner />
              </div>
            </AppProvider>
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
