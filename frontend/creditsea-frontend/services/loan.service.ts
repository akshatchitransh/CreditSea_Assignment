import api from "./api";

export async function getPendingLoans() {

  const response = await api.get(
    "/sanction/pending"
  );

  return response.data;
}

export async function sanctionLoan(
  loanId: string,
  approved: boolean,
  rejectionReason?: string
) {

  const response = await api.patch(
    `/sanction/${loanId}`,
    {
      approved,
      rejectionReason,
    }
  );

  return response.data;
}

export async function getSanctionedLoans() {

  const response = await api.get(
    "/disbursement/sanctioned"
  );

  return response.data;
}

export async function disburseLoan(
  loanId: string
) {

  const response = await api.patch(
    `/disbursement/${loanId}`
  );

  return response.data;
}

export async function getActiveLoans() {

  const response = await api.get(
    "/collection/active"
  );

  return response.data;
}

export async function repayLoan(
  loanId: string,
  data: {
    amount: number;
    paymentMode: string;
    utrNumber: string;
  }
) {

  const response = await api.post(
    `/repayment/${loanId}`,
    data
  );

  return response.data;
}

export async function getSalesLeads() {

  const response = await api.get(
    "/sales/leads"
  );

  return response.data;
}