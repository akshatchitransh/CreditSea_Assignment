"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import {
  disburseLoan,
  getSanctionedLoans,
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

export default function DisbursementTable() {

  const [loans, setLoans] = useState<
    Loan[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const fetchLoans = async () => {

    try {

      const response =
        await getSanctionedLoans();

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

  const handleDisburse = async (
    loanId: string
  ) => {

    try {

      await disburseLoan(loanId);

      toast.success(
        "Loan disbursed"
      );

      fetchLoans();

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
          "Disbursement failed"
      );
    }
  };

  if (loading) {

    return (
      <div className="text-slate-400">
        Loading sanctioned loans...
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
          Sanctioned Loans
        </h2>

        <p className="text-slate-400 mt-2">
          Release approved loan funds
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
              Action
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
                    bg-cyan-400/10
                    text-cyan-400
                  "
                >
                  {loan.status}
                </span>

              </td>

              <td>

                <button
                  onClick={() =>
                    handleDisburse(
                      loan._id
                    )
                  }
                  className="
                    h-10
                    px-5
                    rounded-xl
                    bg-cyan-400
                    text-black
                    font-medium
                  "
                >
                  Disburse
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}