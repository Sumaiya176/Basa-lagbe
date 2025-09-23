// app/(main)/layout.tsx

import "@/app/globals.css";

import AdminLayout from "@/components/Admin/AdminLayout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminLayout>{children}</AdminLayout>
    </div>
  );
}
