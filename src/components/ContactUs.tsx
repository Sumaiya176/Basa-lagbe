"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useSendMessageMutation } from "@/redux/features/contactUs/contactApi";
import { ToastContainer, toast } from "react-toastify";

type ContactFormInputs = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

const notify = (text: string) => toast(text);

const ContactUs = () => {
  const [sendMessage] = useSendMessageMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInputs>();

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      setError(null);
      setSuccess(null);

      // 🔹 --------------  Send form data to your backend API  ---------------------
      const result = await sendMessage(data).unwrap();

      console.log(result, result?.isSuccess);
      if (result?.isSuccess) {
        //console.log(result?.message);
        notify(result?.message);
      }
    } catch (err: any) {
      notify(err?.data?.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      <section className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
        <p className="text-lg text-gray-600">
          Have questions? We’d love to hear from you.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg rounded-2xl p-8 space-y-6"
        >
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">Phone (optional)</label>
            <input
              {...register("phone")}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="+8801XXXXXXXXX"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Message</label>
            <textarea
              {...register("message", { required: "Message is required" })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write your message..."
              rows={5}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          {success && <p className="text-green-600">{success}</p>}
          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="space-y-6">
          <div className="bg-indigo-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-indigo-700">
              Contact Information
            </h2>
            <p className="text-gray-600 mt-2">
              Feel free to reach out directly via email or phone.
            </p>
            <div className="mt-4 space-y-2">
              <p>📧 Email: support@tolet.com</p>
              <p>📞 Phone: +880 1234-567890</p>
              <p>📍 Address: Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* <div className="bg-indigo-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-indigo-700">
              Business Hours
            </h2>
            <ul className="mt-2 text-gray-600">
              <li>Mon - Fri: 9:00 AM - 8:00 PM</li>
              <li>Sat: 10:00 AM - 6:00 PM</li>
              <li>Sun: Closed</li>
            </ul>
          </div> */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactUs;
