"use client";

import { currentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { JwtPayload } from "jwt-decode";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";
import { ToastContainer, toast } from "react-toastify";

const notify = (text: string) => toast(text);

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const token = useAppSelector(currentToken);
  const router = useRouter();
  const urlPrefix = pathname.split("/")?.[1];

  if (urlPrefix === "admin") {
    const decoded: CustomJwtPayload = verifyToken(token as string);
    console.log(decoded);
    const { role } = decoded;
    if (role !== "admin") {
      notify("You are not authorized user");
      <ToastContainer />;
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }

  // console.log(pathname.split("/")?.[1]);

  if (!token) {
    router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
  }
  return children;
};

export default ProtectedRoute;
