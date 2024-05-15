import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import TanstackProvider from "@/providers/TanstackProvider";

const font = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "TCET Sched",
  description: "TCET Appointment syste",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={font.className}>
          <TanstackProvider>
            {children}
            <Toaster />
          </TanstackProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
