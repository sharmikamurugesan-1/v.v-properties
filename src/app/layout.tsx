import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, Noto_Sans_Tamil } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { LanguageProvider } from '@/i18n';
import MotionProvider from '@/components/motion/MotionProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyMobileBar from '@/components/layout/StickyMobileBar';
import SiteVisitModal from '@/components/modals/SiteVisitModal';
import ToastContainer from '@/components/layout/ToastContainer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  weight: ['400', '500', '600'],
  variable: '--font-tamil',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'V.V Properties Coimbatore | Verified Plots & Residential Villas',
  description: "Verified clear-title DTCP & RERA approved residential plots and luxury villas in Coimbatore's prime growth corridors: Saravanampatti and Kovilpalayam.",
  metadataBase: new URL('http://localhost:3000'),
  keywords: [
    'V.V Properties',
    'V.V Properties Coimbatore',
    'Plots in Saravanampatti',
    'Plots near CHIL SEZ IT Park',
    'Plots in Kovilpalayam',
    'DTCP Approved plots in Coimbatore',
    'RERA approved plots Coimbatore',
    'Tech Valley Coimbatore',
    'The Garden City Kovilpalayam',
    'Coimbatore real estate'
  ],
  openGraph: {
    title: 'V.V Properties Coimbatore | Verified land. Thoughtfully planned.',
    description: 'Verified clear title DTCP & RERA approved residential plots in Coimbatore.',
    url: 'https://vvpropertiescbe.com',
    siteName: 'V.V Properties',
    images: [
      {
        url: '/brand/vv-properties-logo.jpg',
        width: 800,
        height: 800,
        alt: 'V.V Properties Logo'
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/brand/vv-properties-logo.jpg',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${inter.variable} ${notoSansTamil.variable}`}>
      <body className="bg-ivory text-ink font-sans antialiased selection:bg-ink selection:text-ivory">
        <LanguageProvider>
          <MotionProvider>
            <AppProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main id="main" className="flex-grow w-full overflow-x-hidden">
                  {children}
                </main>
                <Footer />
                <StickyMobileBar />
                <SiteVisitModal />
                <ToastContainer />
              </div>
            </AppProvider>
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
