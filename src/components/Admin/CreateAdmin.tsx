"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  userName: string;
  email: string;
  password: string;
};

const CreateAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/users/create-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to create admin");

      setMessage(`✅ Admin user "${data.userName}" created successfully`);
      reset();
    } catch (error: any) {
      setMessage(`❌ ${error.message}`);
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

      {message && <div className="mt-4 text-center font-medium">{message}</div>}
    </div>
  );
};

export default CreateAdmin;
