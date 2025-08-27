import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <Button
        asChild
        variant="outline"
        className="absolute inset-y-8 left-8 w-20
      "
      >
        <Link href="/">
          <ArrowLeft />
          Back
        </Link>
      </Button>

      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl font-bold tracking-wide pb-6">SoyVibeCoder</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
