import { Suspense } from "react";
import clsx from "clsx";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";

import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { MobileTopBar } from "@/components/mobile-top-bar";
import { SidebarProviderWrapper } from "@/components/sidebar-provider-wrapper";
import { OrganizationSchema } from "@/components/structured-data/organization-schema";
import { WebsiteSchema } from "@/components/structured-data/website-schema";
import { Toaster } from "@/components/ui/sonner";
import { WelcomeModalWrapper } from "@/components/welcome-modal-wrapper";
import { ThemeProvider } from "@/providers/theme-provider";

import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usporedicijene.info"),
  title: {
    default: "Usporedi cijene - Usporedba cijena proizvoda u Hrvatskoj",
    template: "%s | Usporedi cijene",
  },
  alternates: {
    languages: {
      "hr-HR": "/",
    },
  },
  description:
    "Usporedi cijene proizvoda u svim velikim trgovačkim lancima u Hrvatskoj. Pronađi najjeftiniju opciju za tvoju kupovinu u Konzumu, Kauflandu, Lidlu, Sparu i drugim trgovinama.",
  keywords: [
    "usporedi cijene",
    "usporedba cijena",
    "cijene proizvoda",
    "trgovine hrvatska",
    "konzum",
    "kaufland",
    "lidl",
    "spar",
    "plodine",
    "studenac",
    "dm",
    "kupovina",
    "popusti",
    "najbolja cijena",
    "trgovački lanci",
    "croatia prices",
    "price comparison",
  ],
  creator: "Nvteh",
  publisher: "Nvteh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="#ffffff" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <link
          href="/logo-icons/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/logo-icons/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/logo-icons/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link
          href="/logo-icons/android-chrome-192x192.png"
          rel="icon"
          sizes="192x192"
          type="image/png"
        />
        <link
          href="/logo-icons/android-chrome-512x512.png"
          rel="icon"
          sizes="512x512"
          type="image/png"
        />
        <link href="/site.webmanifest" rel="manifest" />

        <link
          href="https://unpkg.com/maplibre-gl@5.6.2/dist/maplibre-gl.css"
          rel="stylesheet"
        />
      </head>

      <body
        className={clsx(geistSans.variable, geistMono.variable, "antialiased")}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <NextIntlClientProvider>
            <Suspense>
              <SidebarProviderWrapper>
                <AppSidebar />
                <main className="flex h-dvh min-h-0 w-full flex-col">
                  <Suspense>
                    <MobileTopBar />
                  </Suspense>
                  <section className="flex min-h-0 w-full flex-1 flex-col items-center overflow-y-auto pt-[56px] md:pt-0">
                    {children}
                  </section>
                </main>
              </SidebarProviderWrapper>
            </Suspense>
            <WelcomeModalWrapper />
            <Toaster />
          </NextIntlClientProvider>
          <OrganizationSchema />
          <WebsiteSchema />
        </ThemeProvider>
      </body>
    </html>
  );
}
