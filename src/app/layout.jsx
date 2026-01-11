// 'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "../components/ui/sonner";
import ConditionalLayout from "../components/ConditionalLayout";



export const metadata = {
  title: "Moon Lagree Studio",
  description: "Moon Lagree Studio – Dakar Studio de Lagree à Dakar. Cours intensifs, rapides et efficaces pour sculpter et renforcer le corps. Réservez en ligne et vivez l’expérience Moon.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },

};

export default function RootLayout({ children }) {


  return (
    <html lang="fr">
      <head>
        {/* Vendor CSS */}
        <link href="/vender/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/vender/icofont/icofont.min.css" rel="stylesheet" />
        <link href="/vender/aos/aos.css" rel="stylesheet" />
        <link href="/vender/remixicon/remixicon.css" rel="stylesheet" />

        {/* CSS personnalisé */}
        <link href="/css/style.css" rel="stylesheet" />
        <link href="/css/common.css" rel="stylesheet" />

        {/* <link href="https://fonts.googleapis.com/css2?family=Cormorant+Unicase:wght@300;400;500;600;700&display=swap" rel="stylesheet"/> */}

        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700&display=swap" rel="stylesheet" />

        <style>{`

        html, body {
            font-family: "Raleway", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            font-weight: 400;
          }

          h1, h2, h3, h4, h5, h6 {
            font-family: "Raleway", sans-serif;
            font-weight: 700;
          }
        `}</style>
      </head>
      <body suppressHydrationWarning={true}>
        <ConditionalLayout>
          <Toaster position="top-center" richColors />
          {children}
        </ConditionalLayout>

        {/* Scripts avec Next.js Script component */}
        <Script
          src="/vender/bootstrap/js/bootstrap.bundle.min.js "
          async strategy="afterInteractive"
        />
        <Script
          src="/vender/jquery/jquery-3.6.4.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/vender/aos/dist/aos.js"
          strategy="afterInteractive"
        />
        <Script
          src="/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}