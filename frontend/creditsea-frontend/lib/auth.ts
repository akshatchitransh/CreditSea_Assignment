import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
  email: string;
  id: string;
}

export function getUserFromToken() {

  if (typeof window === "undefined") {
    return null;
  }

  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
}