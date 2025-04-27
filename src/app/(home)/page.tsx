"use client";

import { useAuthStore } from "@/stores/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();
  const logout = () => {
    clearAuth();
    router.push("/login");
  };
  return (
    <div className="text-9xl text-green-800">
      ini adalah home
      {!user && <Link href="/login">Sign In</Link>}
      {!!user && <p onClick={logout}>Log Out</p>}
    </div>
  );
}
