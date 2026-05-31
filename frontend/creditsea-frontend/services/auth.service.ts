import api from "./api";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
}

export async function loginUser(data: LoginData) {
  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;
}