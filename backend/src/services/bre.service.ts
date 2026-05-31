import { EmploymentMode } from "../models/BorrowerProfile.js";

interface BREInput {
  dob: Date;

  monthlySalary: number;

  pan: string;

  employmentMode: EmploymentMode;
}

export const validateBRE = (data: BREInput) => {
  const errors: string[] = [];

  // PAN REGEX
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!panRegex.test(data.pan)) {
    errors.push("Invalid PAN format");
  }

  // AGE VALIDATION
  const today = new Date();

  const birthDate = new Date(data.dob);

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff =
    today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 23 || age > 50) {
    errors.push(
      "Age must be between 23 and 50"
    );
  }

  // SALARY CHECK
  if (data.monthlySalary < 25000) {
    errors.push(
      "Monthly salary must be at least 25000"
    );
  }

  // EMPLOYMENT CHECK
  if (
    data.employmentMode ===
    EmploymentMode.UNEMPLOYED
  ) {
    errors.push(
      "Unemployed applicants are not eligible"
    );
  }

  return {
    passed: errors.length === 0,
    errors,
  };
};