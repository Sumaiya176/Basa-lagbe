import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
//import Navbar from "@/components/Navbar";
import { Providers } from "@/redux/providers";

const inter = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Basa Lagbe",
  description: "A home rental site for Bangladesh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <div className="mx-8 md:mx-16 my-7">
          <Navbar />
          <div className="min-h-screen">{children}</div>
        </div> */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
