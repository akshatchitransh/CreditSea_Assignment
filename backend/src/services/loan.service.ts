export const calculateLoanDetails = (
  principal: number,

  tenureDays: number
) => {
  const interestRate = 12;

  const interest =
    (principal *
      interestRate *
      tenureDays) /
    (365 * 100);

  const totalRepayment =
    principal + interest;

  return {
    interestRate,

    interestAmount: Number(
      interest.toFixed(2)
    ),

    totalRepayment: Number(
      totalRepayment.toFixed(2)
    ),
  };
};