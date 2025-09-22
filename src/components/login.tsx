"use client";

import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const router = useRouter();
  const notify = (text: string) => toast(text);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // console.log("data", data);
    try {
      const result = await login(data).unwrap();

      if (result?.isSuccess === "true" || result?.isSuccess === true) {
        const user = jwtDecode(result.data.accessToken);
        console.log("from login.tsx file", user, result.data.accessToken);
        dispatch(setUser({ user, token: result.data.accessToken }));
        notify(result?.message);

        router.push(searchParams.get("redirect") || "/");
      }
    } catch (err: any) {
      notify(err?.data?.message);
    }
  };
  return (
    <div className="bg-hero bg-cover bg-center h-screen flex justify-center items-center">
      <div className="bg-black bg-opacity-60 z-10 p-16 rounded">
        <p className="text-white text-3xl font-extrabold text-center my-3">
          Login
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <input
            placeholder="example@gmail.com"
            {...register("email")}
            className="border border-slate-400 px-3  md:w-72 h-14 py-2 rounded my-5"
          />
          <br />
          <input
            placeholder="Password"
            className="border border-slate-400 w-full px-3 md:w-72 h-14 py-2 rounded"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
          <br />

          <input
            className="bg-orange-500 w-full md:w-72 h-14 text-lg font-semibold tracking-wider cursor-pointer text-white my-10 px-3 py-2 rounded"
            type="submit"
            value={"LogIn"}
          />
        </form>

        <ToastContainer />

        <hr className="text-white" />

        <div className="flex justify-center gap-8 mt-6">
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "http://localhost:3000",
              })
            }
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="44"
              height="44"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
          </button>

          <button
            onClick={() =>
              signIn("github", {
                callbackUrl: "http://localhost:3000",
              })
            }
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github-icon lucide-github"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </button>
        </div>

        <p className="block text-white w-full pt-4">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have any account?{" "}
          <Link className="text-red-500" href="/register">
            SignUp
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
