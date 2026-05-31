interface BorrowerStepperProps {
  currentStep: number;
}

const steps = [
  "Personal Details",
  "Upload Slip",
  "Loan Config",
  "Review",
];

export default function BorrowerStepper({
  currentStep,
}: BorrowerStepperProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[700px] flex items-center justify-between gap-4">

        {steps.map((step, index) => {
          const active = currentStep >= index + 1;

          return (
            <div
              key={step}
              className="flex items-center flex-1"
            >

              {/* CIRCLE */}
              <div className="flex flex-col items-center">

                <div
                  className={`
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    font-semibold
                    border
                    transition-all
                    ${
                      active
                        ? "bg-cyan-400 text-black border-cyan-400"
                        : "bg-white/5 border-white/10 text-slate-400"
                    }
                  `}
                >
                  {index + 1}
                </div>

                <p
                  className={`
                    mt-3
                    text-sm
                    whitespace-nowrap
                    ${
                      active
                        ? "text-white"
                        : "text-slate-500"
                    }
                  `}
                >
                  {step}
                </p>

              </div>

              {/* LINE */}
              {index !== steps.length - 1 && (
                <div
                  className={`
                    flex-1
                    h-[2px]
                    mx-4
                    ${
                      currentStep > index + 1
                        ? "bg-cyan-400"
                        : "bg-white/10"
                    }
                  `}
                />
              )}

            </div>
          );
        })}

      </div>
    </div>
  );
}