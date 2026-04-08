import { ApolloClientProvider } from "@/providers/ApolloClientProvider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "../styles/globals.css";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { TanstackQueryProvider } from "@/providers/TanstackQueryProvider";
import { ServiceWorkerRegistrar } from "@/components/common/ServiceWorkerRegistrar";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Portfolio-Hub",
  description: "A platform for showcasing your portfolio, projects and albums.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={geist.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <TanstackQueryProvider>
          <ApolloClientProvider>
            <NextIntlClientProvider messages={messages}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <ToastProvider />
                <ServiceWorkerRegistrar />
                {children}
              </ThemeProvider>
            </NextIntlClientProvider>
          </ApolloClientProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
