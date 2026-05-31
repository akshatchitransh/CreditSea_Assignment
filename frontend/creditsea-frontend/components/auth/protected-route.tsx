"use client";

import { useRouter } from "next/navigation";

import {
  ReactNode,
  useEffect,
} from "react";

import { getUserFromToken } from "@/lib/auth";

import { ROLES } from "@/lib/roles";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props) {

  const router = useRouter();

  useEffect(() => {

    const user = getUserFromToken();

    // NOT LOGGED IN
    if (!user) {
      router.push("/login");
      return;
    }

    // BORROWER BLOCKED
    if (user.role === ROLES.BORROWER) {
      router.push("/apply");
      return;
    }

  }, [router]);

  return <>{children}</>;
}