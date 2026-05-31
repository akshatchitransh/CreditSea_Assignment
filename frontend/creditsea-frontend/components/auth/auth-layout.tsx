import React from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-400 flex items-center justify-center text-black font-bold">
              CS
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                CreditSea
              </h1>

              <p className="text-sm text-slate-400">
                Loan Management System
              </p>
            </div>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-[#0B1730]/80 border border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8">

          <div className="space-y-2 mb-8 text-center">
            <h2 className="text-3xl font-bold">
              {title}
            </h2>

            <p className="text-slate-400">
              {subtitle}
            </p>
          </div>

          {children}

        </div>

      </div>

    </main>
  );
}