"use client";

import { useMemo, useState } from "react";

import { toast } from "sonner";

import { applyLoan } from "@/services/borrower.service";

interface Props {
  onSuccess: () => void;
}

export default function LoanCalculator({
  onSuccess,
}: Props) {

  const [amount, setAmount] = useState(100000);

  const [tenure, setTenure] = useState(180);

  const [loading, setLoading] = useState(false);

  const interestRate = 12;

  const simpleInterest = useMemo(() => {

    return (
      (amount * interestRate * tenure) /
      (365 * 100)
    );

  }, [amount, tenure]);

  const totalRepayment = amount + simpleInterest;

  const handleApplyLoan = async () => {

    try {

      setLoading(true);

      await applyLoan({
        principalAmount: amount,
        tenureDays: tenure,
      });

      toast.success(
        "Loan application submitted successfully"
      );

      onSuccess();

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
        "Loan application failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      className="
        bg-[#0B1730]
        border
        border-white/10
        rounded-3xl
        p-6
        sm:p-8
        shadow-[0_0_40px_rgba(20,216,255,0.08)]
      "
    >

      <div className="mb-8">

        <h2 className="text-2xl font-bold">
          Configure Loan
        </h2>

        <p className="text-slate-400 mt-2">
          Select loan amount and repayment tenure
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        <div className="space-y-10">

          {/* AMOUNT */}
          <div>

            <div className="flex items-center justify-between mb-4">

              <h3 className="font-semibold">
                Loan Amount
              </h3>

              <p className="text-cyan-400 font-bold text-xl">
                ₹{amount.toLocaleString()}
              </p>

            </div>

            <input
              type="range"
              min={50000}
              max={500000}
              step={10000}
              value={amount}
              onChange={(e) =>
                setAmount(Number(e.target.value))
              }
              className="
                w-full
                accent-cyan-400
                cursor-pointer
              "
            />

            <div className="flex justify-between text-sm text-slate-400 mt-2">
              <span>₹50K</span>
              <span>₹5L</span>
            </div>

          </div>

          {/* TENURE */}
          <div>

            <div className="flex items-center justify-between mb-4">

              <h3 className="font-semibold">
                Loan Tenure
              </h3>

              <p className="text-cyan-400 font-bold text-xl">
                {tenure} Days
              </p>

            </div>

            <input
              type="range"
              min={30}
              max={365}
              step={5}
              value={tenure}
              onChange={(e) =>
                setTenure(Number(e.target.value))
              }
              className="
                w-full
                accent-cyan-400
                cursor-pointer
              "
            />

            <div className="flex justify-between text-sm text-slate-400 mt-2">
              <span>30 Days</span>
              <span>365 Days</span>
            </div>

          </div>

        </div>

        {/* SUMMARY */}
        <div
          className="
            rounded-3xl
            bg-black/20
            border
            border-white/10
            p-6
            flex
            flex-col
            justify-between
          "
        >

          <div>

            <div className="mb-8">

              <h3 className="text-xl font-semibold">
                Loan Summary
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                Live repayment calculation
              </p>

            </div>

            <div className="space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-slate-400">
                  Principal Amount
                </span>

                <span className="font-semibold">
                  ₹{amount.toLocaleString()}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-400">
                  Interest Rate
                </span>

                <span className="font-semibold">
                  {interestRate}% p.a.
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-400">
                  Tenure
                </span>

                <span className="font-semibold">
                  {tenure} Days
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-400">
                  Simple Interest
                </span>

                <span className="font-semibold text-cyan-400">
                  ₹{simpleInterest.toFixed(0)}
                </span>

              </div>

            </div>

          </div>

          <div
            className="
              mt-8
              rounded-2xl
              bg-cyan-400/10
              border
              border-cyan-400/20
              p-5
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">
                  Total Repayment
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  ₹{totalRepayment.toFixed(0)}
                </h2>

              </div>

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-cyan-400
                  text-black
                  flex
                  items-center
                  justify-center
                  text-2xl
                "
              >
                ₹
              </div>

            </div>

          </div>

        </div>

      </div>

      <button
        onClick={handleApplyLoan}
        disabled={loading}
        className="
          mt-10
          h-12
          px-8
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
          ? "Applying..."
          : "Apply Loan"}
      </button>

    </div>
  );
}