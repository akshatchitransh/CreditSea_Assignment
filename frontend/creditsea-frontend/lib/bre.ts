import { BorrowerFormData } from "@/types/borrower";

export function validateBRE(data: BorrowerFormData) {
  const errors: string[] = [];

  // AGE
  const birthYear = new Date(data.dob).getFullYear();
  const currentYear = new Date().getFullYear();

  const age = currentYear - birthYear;

  if (age < 23 || age > 50) {
    errors.push("Age must be between 23 and 50");
  }

  // SALARY
  if (data.monthlySalary < 25000) {
    errors.push("Monthly salary must be above ₹25,000");
  }

  // EMPLOYMENT
  if (data.employmentMode === "UNEMPLOYED") {
    errors.push("Employment status cannot be unemployed");
  }

  // PAN
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!panRegex.test(data.pan)) {
    errors.push("Invalid PAN format");
  }

  return errors;
}