import Navbar from "@/components/layout/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="space-y-8 text-center lg:text-left">

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

              <span className="text-cyan-300 text-sm font-medium">
                CreditSea Lending Platform
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                Modern Loan
                <span className="text-cyan-400">
                  {" "}Management
                </span>
              </h1>

              <p className="text-slate-400 text-lg max-w-xl mx-auto lg:mx-0">
                Secure borrower onboarding, loan approval,
                disbursement and repayment tracking
                in one intelligent platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                className="
                  h-12
                  px-8
                  rounded-2xl
                  bg-cyan-400
                  text-black
                  font-semibold
                  hover:bg-cyan-300
                  transition-all
                "
              >
                Get Started
              </button>

              <button
                className="
                  h-12
                  px-8
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  hover:bg-white/10
                  transition-all
                "
              >
                Dashboard
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">

            <div className="absolute inset-0 bg-cyan-400/20 blur-3xl rounded-full" />

            <div
              className="
                relative
                bg-[#0B1730]/80
                border
                border-white/10
                backdrop-blur-xl
                rounded-3xl
                p-6
                sm:p-8
              "
            >

              <div className="space-y-4">

                {[
                  "Borrower Verification",
                  "Loan Sanction",
                  "Disbursement",
                  "Collections",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex
                      items-center
                      justify-between
                      p-5
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/5
                    "
                  >
                    <span className="font-medium">
                      {item}
                    </span>

                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </main>
    </>
  );
}