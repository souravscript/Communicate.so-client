"use client";

import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const localUser = Cookies.get("user");
  const user = localUser ? (JSON.parse(localUser) as { id: string; name: string }) : null;
  
  useEffect(() => {
    if (!user) {
      router.push("/auth/signin");
    }
  }, [user]);

  return user ? children : null;
};

export default ProtectedRoute;
