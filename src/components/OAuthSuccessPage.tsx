"use client";

import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const notify = (text: string) => toast(text);

export default function OAuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useAppDispatch();

  //   console.log(token);

  useEffect(() => {
    if (token) {
      // Save token in localStorage or Redux
      const user = jwtDecode(token);
      console.log(user, token);
      dispatch(setUser({ user, token }));
      notify("Registration Successful...");

      // redirect user to dashboard
      router.push("/");
    }
  }, [token, router, dispatch]);

  return (
    <div>
      <p className="flex justify-center items-center text-4xl">
        Logging you in...
      </p>
      <ToastContainer />
    </div>
  );
}
