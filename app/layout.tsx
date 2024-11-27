import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { AppNavbar } from "@/components/app-navbar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

const onest = Onest({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shop Yangu",
  description: "Shop Yangu admin panel and dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={onest.className}>
        <main>
          <SidebarProvider>
            <div className="flex w-full h-screen 2xl:container">
              <AppSidebar />
              <div className="flex-1 overflow-auto">
                <AppNavbar />
                <div className="p-4">{children}</div>
              </div>
            </div>
            <Toaster />
          </SidebarProvider>
        </main>
      </body>
    </html>
  );
}
