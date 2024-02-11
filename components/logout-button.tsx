'use client'

import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter()
  const handleLogout = async () => {
    await signOut();
    router.refresh();
  }
  return (
    <div className="w-full" onClick={handleLogout}>Log out</div>
  );
};

export default LogoutButton;
