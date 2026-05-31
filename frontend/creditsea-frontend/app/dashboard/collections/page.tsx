"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";

import CollectionTable from "@/components/dashboard/collection-table";

import ProtectedRoute from "@/components/auth/protected-route";

export default function CollectionsPage() {

  return (
    <ProtectedRoute>

      <DashboardLayout>

        <div className="space-y-8">

          <div>

            <h1 className="text-4xl font-bold">
              Collections
            </h1>

            <p className="text-slate-400 mt-2">
              Manage repayments and outstanding balances
            </p>

          </div>

          <CollectionTable />

        </div>

      </DashboardLayout>

    </ProtectedRoute>
  );
}