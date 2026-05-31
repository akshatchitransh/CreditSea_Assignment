"use client";

import { useState } from "react";

import BorrowerStepper from "@/components/borrower/borrower-stepper";
import LoanCalculator from "@/components/borrower/loan-calculator";
import PersonalDetailsForm from "@/components/borrower/personal-details-form";
import SalarySlipUpload from "@/components/borrower/salary-slip-upload";

import Navbar from "@/components/layout/navbar";

export default function ApplyPage() {

  const [currentStep, setCurrentStep] =
    useState(1);

  return (
    <>
      <Navbar />

      <main className="min-h-screen px-4 py-10">

        <div className="max-w-5xl mx-auto space-y-10">

          {/* HEADER */}
          <div className="text-center">

            <h1 className="text-4xl font-bold">
              Borrower Application
            </h1>

            <p className="text-slate-400 mt-3">
              Complete the loan onboarding process
            </p>

          </div>

          {/* STEPPER */}
          <BorrowerStepper
            currentStep={currentStep}
          />

          {/* STEP 1 */}
          {currentStep === 1 && (
            <PersonalDetailsForm
              onSuccess={() =>
                setCurrentStep(2)
              }
            />
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <SalarySlipUpload
              onSuccess={() =>
                setCurrentStep(3)
              }
            />
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <LoanCalculator
              onSuccess={() =>
                setCurrentStep(4)
              }
            />
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <div
              className="
                bg-[#0B1730]
                border
                border-white/10
                rounded-3xl
                p-10
                text-center
              "
            >

              <h2 className="text-3xl font-bold">
                🎉 Loan Application Submitted
              </h2>

              <p className="text-slate-400 mt-4">
                Your loan request has been
                submitted successfully.
              </p>

            </div>
          )}

        </div>

      </main>
    </>
  );
}