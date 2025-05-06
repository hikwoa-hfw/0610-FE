"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const session = useSession()
  const logout = () => {
    signOut();
    router.push("/login");
  };
  return (
    <div className="text-9xl text-green-800">
      ini adalah home
      {!session.data?.user && <Link href="/login">Sign In</Link>}
      {!!session.data?.user && <p onClick={logout}>Log Out</p>}
    </div>
  );
}
