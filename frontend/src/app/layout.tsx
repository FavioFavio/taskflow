import type { Metadata } from "next";
import { Geist_Mono, Nunito } from "next/font/google";
import { Suspense } from "react";

import { RedirectToast } from "@/components/shared/redirect-toast";
import { ThemeScript } from "@/components/shared/theme-script";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Gestión de tareas para equipos enfocados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${nunito.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className={`${nunito.className} flex min-h-full flex-col`}>
        <ToastProvider>
          <Suspense fallback={null}>
            <RedirectToast />
          </Suspense>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
