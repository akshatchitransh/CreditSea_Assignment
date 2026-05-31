"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";

import ProtectedRoute from "@/components/auth/protected-route";

export default function AnalyticsPage() {

  return (
    <ProtectedRoute>

      <DashboardLayout>

        <div className="space-y-8">

          <div>

            <h1 className="text-4xl font-bold">
              Analytics
            </h1>

            <p className="text-slate-400 mt-2">
              Platform insights and business metrics
            </p>

          </div>

          <div
            className="
              grid
              md:grid-cols-3
              gap-6
            "
          >

            {[
              {
                title: "Total Loans",
                value: "124",
              },

              {
                title: "Disbursed",
                value: "89",
              },

              {
                title: "Collections",
                value: "₹12.5L",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="
                  bg-[#0B1730]
                  border
                  border-white/10
                  rounded-3xl
                  p-6
                "
              >

                <p className="text-slate-400">
                  {card.title}
                </p>

                <h2
                  className="
                    text-4xl
                    font-bold
                    mt-4
                    text-cyan-400
                  "
                >
                  {card.value}
                </h2>

              </div>
            ))}

          </div>

        </div>

      </DashboardLayout>

    </ProtectedRoute>
  );
}