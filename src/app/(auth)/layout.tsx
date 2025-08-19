// app/(auth)/layout.tsx
import "@/app/globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="">{children}</main>;
}
