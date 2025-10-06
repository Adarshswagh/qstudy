import "./globals.css";
import type { ReactNode } from "react";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActionButtons } from "@/components/FloatingActionButtons";

export const metadata = {
  title: "QStudy World",
  description: "Your Global Education Partner",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1 pt-24">{children}</main>
            <Footer />
            <FloatingActionButtons 
              whatsappNumber="+60125037122"
              phoneNumber="+60125037122"
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}



