"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import AuthLayout from "@/components/auth/auth-layout";

import { registerUser } from "@/services/auth.service";

import { toast } from "sonner";

export default function RegisterPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {

    try {

      setLoading(true);

      await registerUser(formData);

      toast.success(
        "Registration successful"
      );

      router.push("/login");

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
        "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Register as borrower"
    >

      <div className="space-y-5">

        {/* NAME */}
        <div className="space-y-2">
          <label className="text-sm text-slate-300">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
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

        {/* EMAIL */}
        <div className="space-y-2">
          <label className="text-sm text-slate-300">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
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
          onClick={handleRegister}
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
            ? "Creating Account..."
            : "Register"}
        </button>

      </div>

    </AuthLayout>
  );
}