import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ThemeProvider } from 'next-themes';
import { SiteHeader } from "@/components/site-header"
import { CommandDialog } from "@/components/ui/command"
import { Providers } from '@/components/Providers';
import { Toaster } from "@/components/ui/toaster"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sparta",
  description: "The financial trading platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <ThemeProvider attribute="class" defaultTheme="system">
          <Providers>
            <CommandDialog />
            <SidebarProvider>
              <AppSidebar variant="inset" />
              <SidebarInset>
                <SiteHeader />
                <Toaster />
                {children}
              </SidebarInset>
            </SidebarProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
