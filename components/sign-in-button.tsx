"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

interface SignInButtonProps {
  className?: string;
}

const SignInButton = ({className}: SignInButtonProps) => {
  return <Button className={className} onClick={() => signIn("google")}>Sign In</Button>;
};

export default SignInButton;
