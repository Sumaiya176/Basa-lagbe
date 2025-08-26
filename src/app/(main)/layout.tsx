// app/(main)/layout.tsx

import "@/app/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="1xs:mx-2 2xs:mx-2 3xs:mx-2 sm:mx-4 md:mx-6 lg:mx-16 my-7">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </div>
    </>
  );
}
