import { currentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useRouter, usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const token = useAppSelector(currentToken);
  const router = useRouter();

  if (!token) {
    router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
  }
  return children;
};

export default ProtectedRoute;
