"use client";

import { useRef, useState } from "react";

import { toast } from "sonner";

import { uploadSalarySlip } from "@/services/borrower.service";

interface Props {
  onSuccess: () => void;
}

export default function SalarySlipUpload({
  onSuccess,
}: Props) {

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {

      toast.error("File size must be below 5MB");

      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {

    if (!file) {

      toast.error("Please select a file");

      return;
    }

    try {

      setLoading(true);

      await uploadSalarySlip(file);

      toast.success(
        "Salary slip uploaded successfully"
      );

      onSuccess();

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
        "Upload failed"
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
          Upload Salary Slip
        </h2>

        <p className="text-slate-400 mt-2">
          Upload PDF, JPG or PNG (max 5MB)
        </p>

      </div>

      <div
        onClick={() => inputRef.current?.click()}
        className="
          cursor-pointer
          border-2
          border-dashed
          border-cyan-400/20
          rounded-3xl
          p-10
          text-center
          hover:border-cyan-400/50
          hover:bg-cyan-400/5
          transition-all
          duration-300
        "
      >

        <div className="space-y-4">

          <div
            className="
              w-20
              h-20
              mx-auto
              rounded-full
              bg-cyan-400/10
              flex
              items-center
              justify-center
              text-3xl
            "
          >
            📄
          </div>

          <div>

            <h3 className="text-lg font-semibold">
              Drag & Drop Salary Slip
            </h3>

            <p className="text-slate-400 mt-2 text-sm">
              or click to browse files
            </p>

          </div>

        </div>

      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        hidden
        onChange={handleFileChange}
      />

      {file && (
        <div
          className="
            mt-6
            rounded-2xl
            bg-white/5
            border
            border-white/10
            p-4
            flex
            items-center
            justify-between
            gap-4
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-cyan-400/10
                flex
                items-center
                justify-center
              "
            >
              📎
            </div>

            <div>

              <p className="font-medium break-all">
                {file.name}
              </p>

              <p className="text-sm text-slate-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>

            </div>

          </div>

          <button
            onClick={() => setFile(null)}
            className="
              text-red-400
              hover:text-red-300
              transition-all
            "
          >
            Remove
          </button>

        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
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
          disabled:opacity-50
        "
      >
        {loading
          ? "Uploading..."
          : "Upload Salary Slip"}
      </button>

    </div>
  );
}