"use client";

import { useState } from "react";

import { toast } from "sonner";

import BREErrors from "./ber-errors";

import { validateBRE } from "@/lib/bre";

import { createBorrowerProfile } from "@/services/borrower.service";

interface Props {
  onSuccess: () => void;
}

export default function PersonalDetailsForm({
  onSuccess,
}: Props) {

  const [formData, setFormData] = useState({
    fullName: "",
    pan: "",
    dob: "",
    monthlySalary: 0,
    employmentMode: "SALARIED",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async () => {

    const breErrors = validateBRE(formData);

    setErrors(breErrors);

    if (breErrors.length > 0) {
      return;
    }

    try {

      await createBorrowerProfile(formData);

      toast.success(
        "Borrower profile created successfully"
      );

      onSuccess();

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
        "Profile creation failed"
      );
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
          Personal Details
        </h2>

        <p className="text-slate-400 mt-2">
          Complete borrower verification
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* FULL NAME */}
        <div className="space-y-2">

          <label className="text-sm text-slate-300">
            Full Name
          </label>

          <input
            placeholder="Akshat Chitransh"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({
                ...formData,
                fullName: e.target.value,
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

        {/* PAN */}
        <div className="space-y-2">

          <label className="text-sm text-slate-300">
            PAN Number
          </label>

          <input
            placeholder="ABCDE1234F"
            value={formData.pan}
            onChange={(e) =>
              setFormData({
                ...formData,
                pan: e.target.value.toUpperCase(),
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

        {/* DOB */}
        <div className="space-y-2">

          <label className="text-sm text-slate-300">
            Date of Birth
          </label>

          <input
            type="date"
            value={formData.dob}
            onChange={(e) =>
              setFormData({
                ...formData,
                dob: e.target.value,
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

        {/* SALARY */}
        <div className="space-y-2">

          <label className="text-sm text-slate-300">
            Monthly Salary
          </label>

          <input
            type="number"
            value={formData.monthlySalary}
            onChange={(e) =>
              setFormData({
                ...formData,
                monthlySalary: Number(e.target.value),
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

      </div>

      {/* EMPLOYMENT */}
      <div className="space-y-2 mt-6">

        <label className="text-sm text-slate-300">
          Employment Mode
        </label>

        <select
          value={formData.employmentMode}
          onChange={(e) =>
            setFormData({
              ...formData,
              employmentMode: e.target.value,
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
        >
          <option>SALARIED</option>
          <option>SELF_EMPLOYED</option>
          <option>UNEMPLOYED</option>
        </select>

      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        className="
          mt-8
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
        "
      >
        Validate Eligibility
      </button>

      {/* ERRORS */}
      <BREErrors errors={errors} />

    </div>
  );
}