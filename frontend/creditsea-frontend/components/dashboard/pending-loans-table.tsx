"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import {
  getPendingLoans,
  sanctionLoan,
} from "@/services/loan.service";

interface Loan {

  _id: string;

  principalAmount: number;

  status: string;

  borrowerId: {
    name: string;
    email: string;
  };
}

export default function PendingLoansTable() {

  const [loans, setLoans] = useState<Loan[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedLoan, setSelectedLoan] =
    useState<string | null>(null);

  const [rejectionReason, setRejectionReason] =
    useState("");

  const fetchLoans = async () => {

    try {

      const response =
        await getPendingLoans();

      setLoans(response.loans || []);

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch loans"
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleApprove = async (
    loanId: string
  ) => {

    try {

      await sanctionLoan(
        loanId,
        true
      );

      toast.success(
        "Loan sanctioned"
      );

      fetchLoans();

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
          "Approval failed"
      );
    }
  };

  const handleReject = async (
    loanId: string
  ) => {

    if (!rejectionReason) {

      toast.error(
        "Please provide rejection reason"
      );

      return;
    }

    try {

      await sanctionLoan(
        loanId,
        false,
        rejectionReason
      );

      toast.success(
        "Loan rejected"
      );

      setSelectedLoan(null);

      setRejectionReason("");

      fetchLoans();

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
          "Rejection failed"
      );
    }
  };

  if (loading) {

    return (
      <div className="text-slate-400">
        Loading loans...
      </div>
    );
  }

  return (
    <div
      className="
        bg-[#0B1730]
        border
        border-white/10
        rounded-3xl
        p-6
        overflow-auto
      "
    >

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Pending Loans
        </h2>

        <p className="text-slate-400 mt-2">
          Review borrower applications
        </p>

      </div>

      <table className="w-full min-w-[800px]">

        <thead>

          <tr
            className="
              border-b
              border-white/10
              text-left
              text-slate-400
            "
          >

            <th className="pb-4">
              Borrower
            </th>

            <th className="pb-4">
              Amount
            </th>

            <th className="pb-4">
              Status
            </th>

            <th className="pb-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {loans.map((loan) => (
            <tr
              key={loan._id}
              className="
                border-b
                border-white/5
              "
            >

              <td className="py-5">
                {loan.borrowerId?.name}
              </td>

              <td>
                ₹
                {loan.principalAmount.toLocaleString()}
              </td>

              <td>

                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    bg-yellow-400/10
                    text-yellow-400
                  "
                >
                  {loan.status}
                </span>

              </td>

              <td>

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      handleApprove(
                        loan._id
                      )
                    }
                    className="
                      h-10
                      px-4
                      rounded-xl
                      bg-emerald-400
                      text-black
                      font-medium
                    "
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      setSelectedLoan(
                        selectedLoan ===
                          loan._id
                          ? null
                          : loan._id
                      )
                    }
                    className="
                      h-10
                      px-4
                      rounded-xl
                      bg-red-500
                      text-white
                      font-medium
                    "
                  >
                    Reject
                  </button>

                </div>

                {selectedLoan ===
                  loan._id && (
                  <div
                    className="
                      mt-4
                      flex
                      gap-3
                    "
                  >

                    <input
                      placeholder="Rejection reason"
                      value={
                        rejectionReason
                      }
                      onChange={(e) =>
                        setRejectionReason(
                          e.target.value
                        )
                      }
                      className="
                        h-10
                        rounded-xl
                        bg-black/20
                        border
                        border-white/10
                        px-4
                        outline-none
                      "
                    />

                    <button
                      onClick={() =>
                        handleReject(
                          loan._id
                        )
                      }
                      className="
                        h-10
                        px-4
                        rounded-xl
                        bg-red-500
                        text-white
                      "
                    >
                      Confirm
                    </button>

                  </div>
                )}

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}