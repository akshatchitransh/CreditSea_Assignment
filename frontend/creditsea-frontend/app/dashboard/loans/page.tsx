"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";

import PendingLoansTable from "@/components/dashboard/pending-loans-table";

import DisbursementTable from "@/components/dashboard/disbursement-table";

import ProtectedRoute from "@/components/auth/protected-route";

import { getUserFromToken } from "@/lib/auth";

import { ROLES } from "@/lib/roles";

export default function LoansPage() {

  const user = getUserFromToken();

  const role = user?.role;

  return (
    <ProtectedRoute>

      <DashboardLayout>

        <div className="space-y-8">

          <div>

            <h1 className="text-4xl font-bold">
              Loans Module
            </h1>

            <p className="text-slate-400 mt-2">
              Manage loan approvals and disbursement
            </p>

          </div>

          {(role === ROLES.ADMIN ||
            role === ROLES.SANCTION) && (
            <PendingLoansTable />
          )}

          {(role === ROLES.ADMIN ||
            role === ROLES.DISBURSEMENT) && (
            <DisbursementTable />
          )}

        </div>

      </DashboardLayout>

    </ProtectedRoute>
  );
}