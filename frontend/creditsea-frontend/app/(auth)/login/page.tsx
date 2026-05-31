"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getUserFromToken } from "@/lib/auth";


import AuthLayout from "@/components/auth/auth-layout";

import { loginUser } from "@/services/auth.service";

import { toast } from "sonner";

export default function LoginPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {

    try {

      setLoading(true);

      const response = await loginUser(formData);

      localStorage.setItem(
        "token",
        response.token
      );

      toast.success("Login successful");

      const user = getUserFromToken();

if (user?.role === "BORROWER") {
  router.push("/apply");
} else {
  router.push("/dashboard");
}

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
        "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue"
    >

      <div className="space-y-5">

        {/* EMAIL */}
        <div className="space-y-2">
          <label className="text-sm text-slate-300">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="
              w-full
              h-12
              rounded-2xl
              bg-black/20
              border
              border-white/10
              px-4
              outline-none
              focus:border-cyan-400
              focus:ring-2
              focus:ring-cyan-400/20
            "
          />
        </div>

        {/* PASSWORD */}
        <div className="space-y-2">
          <label className="text-sm text-slate-300">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            className="
              w-full
              h-12
              rounded-2xl
              bg-black/20
              border
              border-white/10
              px-4
              outline-none
              focus:border-cyan-400
              focus:ring-2
              focus:ring-cyan-400/20
            "
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full
            h-12
            rounded-2xl
            bg-cyan-400
            text-black
            font-semibold
            hover:bg-cyan-300
            hover:scale-[1.02]
            transition-all
            duration-300
            disabled:opacity-50
          "
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

      </div>

    </AuthLayout>
  );
}