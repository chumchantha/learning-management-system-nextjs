"use client";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import UserDropdown from "./UserDropdown";

const navigationItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Courses",
    path: "/courses",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
];

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container min-h-14 mx-auto flex gap-4 items-center justify-between px-4 md:px-6 lg:px-8 ">
        <Link href="/">
          <h1 className="text-2xl font-semibold tracking-wide">SoyVibeCoder</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center justify-center gap-4">
            {navigationItems.map((item) => {
              return (
                <div key={item.name}>
                  <Link href={item.path}>{item.name}</Link>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Mobile Nav  */}
        <nav>
          <div className="flex gap-2 items-center justify-center">
            <ThemeToggle />
            {isPending ? null : session ? (
              <UserDropdown
                image={
                  session?.user.image ??
                  `https://avatar.vercel.sh/${session?.user.name}`
                }
                name={
                  session?.user.name && session.user.name.length > 0
                    ? session?.user.name
                    : session?.user.email.split("@")[0]
                }
                email={session.user.email}
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "default" })}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
