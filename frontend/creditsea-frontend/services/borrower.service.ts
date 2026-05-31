import api from "./api";

interface BorrowerProfileData {
  fullName: string;
  pan: string;
  dob: string;
  monthlySalary: number;
  employmentMode: string;
}

export async function createBorrowerProfile(
  data: BorrowerProfileData
) {

  const response = await api.post(
    "/borrower/profile",
    data
  );

  return response.data;
}

export async function uploadSalarySlip(
  file: File
) {

  const formData = new FormData();

  formData.append("salarySlip", file);

  const response = await api.post(
    "/borrower/upload-slip",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function applyLoan(data: {
  principalAmount: number;
  tenureDays: number;
}) {

  const response = await api.post(
    "/loan/apply",
    data
  );

  return response.data;
}