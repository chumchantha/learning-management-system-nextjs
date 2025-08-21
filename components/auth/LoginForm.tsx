"use client";

import React from "react";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const LoginForm = () => {
  return (
    <Card className="w-full max-w-sm mx-auto pb-10">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Hey, Welcome</CardTitle>
        <CardDescription>Login with your Google account</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <>
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>
          <Button className="w-full">
            <GithubIcon /> Login with Github
          </Button>
        </>

        <div className="text-center text-sm relative after:absolute after:inset-0 after:border-t after:fix after:items-center after:top-1/2 after:z-0 after:border-border">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        {/* Email */}
        <form onSubmit={(e) => e.preventDefault()} className="grid gap-4">
          <Input
            type="email"
            name="email"
            className="w-full"
            placeholder="email@example.com"
          />
          <Button type="submit" variant="default" className="w-full">
            Continue with Email
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
