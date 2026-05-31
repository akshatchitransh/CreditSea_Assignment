interface BREErrorsProps {
  errors: string[];
}

export default function BREErrors({
  errors,
}: BREErrorsProps) {
  if (errors.length === 0) return null;

  return (
    <div
      className="
        mt-6
        rounded-3xl
        border
        border-red-500/20
        bg-red-500/10
        p-5
      "
    >

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-red-400">
          BRE Validation Failed
        </h3>

        <p className="text-sm text-red-300/80 mt-1">
          Please resolve the following issues
        </p>
      </div>

      <div className="space-y-3">

        {errors.map((error) => (
          <div
            key={error}
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-black/20
              p-3
            "
          >
            <div className="w-2 h-2 rounded-full bg-red-400" />

            <p className="text-sm">
              {error}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}