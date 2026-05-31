"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import {
  getActiveLoans,
  repayLoan,
} from "@/services/loan.service";

interface Loan {

  _id: string;

  principalAmount: number;

  totalRepayment: number;

  totalPaid?: number;

  status: string;

  borrowerId: {
    name: string;
    email: string;
  };
}

export default function CollectionTable() {

  const [loans, setLoans] = useState<
    Loan[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedLoan, setSelectedLoan] =
    useState<string | null>(null);

  const [amount, setAmount] =
    useState("");

  const [utrNumber, setUtrNumber] =
    useState("");

  const fetchLoans = async () => {

    try {

      const response =
        await getActiveLoans();

      setLoans(response.loans || []);

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch active loans"
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleRepayment = async (
    loanId: string
  ) => {

    if (!amount || !utrNumber) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    try {

      await repayLoan(loanId, {
        amount: Number(amount),
        paymentMode: "UPI",
        utrNumber,
      });

      toast.success(
        "Repayment successful"
      );

      setSelectedLoan(null);

      setAmount("");

      setUtrNumber("");

      fetchLoans();

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
          "Repayment failed"
      );
    }
  };

  if (loading) {

    return (
      <div className="text-slate-400">
        Loading active loans...
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
          Collection Module
        </h2>

        <p className="text-slate-400 mt-2">
          Record repayments and close loans
        </p>

      </div>

      <table className="w-full min-w-[900px]">

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
              Total Repayment
            </th>

            <th className="pb-4">
              Paid
            </th>

            <th className="pb-4">
              Outstanding
            </th>

            <th className="pb-4">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {loans.map((loan) => {

            const paid =
              loan.totalPaid || 0;

            const outstanding =
              loan.totalRepayment -
              paid;

            return (
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
                  {loan.totalRepayment.toLocaleString()}
                </td>

                <td>
                  ₹
                  {paid.toLocaleString()}
                </td>

                <td className="text-yellow-400">
                  ₹
                  {outstanding.toLocaleString()}
                </td>

                <td>

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
                      px-5
                      rounded-xl
                      bg-cyan-400
                      text-black
                      font-medium
                    "
                  >
                    Repay
                  </button>

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

      {selectedLoan && (
        <div
          className="
            mt-8
            rounded-3xl
            bg-black/20
            border
            border-white/10
            p-6
            grid
            md:grid-cols-3
            gap-5
          "
        >

          <input
            type="number"
            placeholder="Repayment amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            className="
              h-12
              rounded-2xl
              bg-black/20
              border
              border-white/10
              px-4
              outline-none
            "
          />

          <input
            placeholder="UTR Number"
            value={utrNumber}
            onChange={(e) =>
              setUtrNumber(
                e.target.value
              )
            }
            className="
              h-12
              rounded-2xl
              bg-black/20
              border
              border-white/10
              px-4
              outline-none
            "
          />

          <button
            onClick={() =>
              handleRepayment(
                selectedLoan
              )
            }
            className="
              h-12
              rounded-2xl
              bg-emerald-400
              text-black
              font-semibold
            "
          >
            Submit Repayment
          </button>

        </div>
      )}

    </div>
  );
}