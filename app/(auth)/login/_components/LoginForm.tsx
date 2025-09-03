"use client";

import React, { useTransition } from "react";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GithubIcon, Loader, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormMessage,
  FormItem,
  FormLabel,
  FormField,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter email address" }),
});
type FormValue = z.infer<typeof formSchema>;

const LoginForm = () => {
  const [googlePending, startGoogleTransition] = useTransition();
  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Signin with Google
  async function signinWithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Google, you will be redirected...");
          },
          onError: (error) => {
            toast.error(error.error?.message);
          },
        },
      });
    });
  }
  // Signin with Github
  async function signinWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Github, you will be redirected...");
          },
          onError: (error) => {
            toast.error(error.error?.message);
          },
        },
      });
    });
  }
  //Signin With Email
  async function signinWithEmail(data: FormValue) {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: data.email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email sent");
            router.push(`/verify-request?email=${data.email}`);
          },
          onError: (error) => {
            toast.error(error.error?.message);
          },
        },
      });
    });
  }

  return (
    <Card className="w-full max-w-sm mx-auto pb-10">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Hey, Welcome</CardTitle>
        <CardDescription>Login with your Google account</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <>
          <Button
            disabled={googlePending}
            onClick={signinWithGoogle}
            variant="outline"
            className="w-full"
          >
            {googlePending ? (
              <>
                <Loader className="animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                <span>Login with Google</span>
              </>
            )}
          </Button>
          <Button
            disabled={githubPending}
            onClick={signinWithGithub}
            className="w-full"
          >
            {githubPending ? (
              <>
                <Loader className="animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <GithubIcon />
                <span>Login with Github</span>
              </>
            )}
          </Button>
        </>

        <div className="text-center text-sm relative after:absolute after:inset-0 after:border-t after:fix after:items-center after:top-1/2 after:z-0 after:border-border">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        {/* Email */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(signinWithEmail)}
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      name="email"
                      className="w-full"
                      placeholder="email@example.com"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <Button
              disabled={emailPending}
              type="submit"
              variant="default"
              className="w-full"
            >
              {emailPending ? (
                <>
                  <Loader className="animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <Send />
                  <span>Continue with Email</span>
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
