// app/(main)/layout.tsx

import "@/app/globals.css";
import UserSidebar from "@/components/Sidebar/UserSidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <UserSidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
