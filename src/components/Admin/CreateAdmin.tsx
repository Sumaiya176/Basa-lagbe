"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCreateAdminMutation } from "@/redux/features/user/userApi";
import { ToastContainer, toast } from "react-toastify";

type FormValues = {
  userName: string;
  email: string;
  password: string;
};

const notify = (text: string) => toast(text);

const CreateAdmin = () => {
  const [createAdmin] = useCreateAdminMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    console.log(data);

    try {
      const admin = { ...data, provider: "credentials", role: "admin" };
      const res = await createAdmin(admin).unwrap();
      console.log(res);
      if (res.isSuccess === true) {
        notify(`✅ Admin user ${res?.data?.userName} created successfully`);
      }
      if (!res.isSuccess)
        throw new Error(res.message || "Failed to create admin");

      reset();
    } catch (error: any) {
      console.log(error);
      notify(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Create New Admin</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            {...register("userName", { required: "Username is required" })}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Enter username"
          />
          {errors.userName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.userName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateAdmin;
