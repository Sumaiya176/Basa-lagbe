// app/(main)/layout.tsx

import "@/app/globals.css";
import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-8 md:mx-16 my-7">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </div>
    </>
  );
}
