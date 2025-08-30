"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useTransition, Suspense } from "react";
import { toast } from "sonner";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Loader } from "lucide-react";

const VerifyRequestContent = () => {
  const [otp, setOtp] = useState<string>("");
  const [emailPending, startEmailTransition] = useTransition();
  const router = useRouter();
  const isOtpCompleted = otp.length === 6;
  /**
   * Get Value from search params
   * ?email=value
   */
  const params = useSearchParams();
  const email = params.get("email") as string;

  function verifyOtp() {
    startEmailTransition(async () => {
      await authClient.signIn.emailOtp({
        email: email,
        otp: otp,
        fetchOptions: {
          onSuccess() {
            toast.success("Email verified");
            router.push("/");
          },
          onError(error) {
            toast.error(error.error?.message);
          },
        },
      });
    });
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="text-center gap-2">
        <CardTitle className="text-xl">Check your email</CardTitle>
        <CardDescription>
          we have sent a verification email to your email. Please check your
          email and paste the code below.
        </CardDescription>
        <CardContent>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-2 justify-center items-center"
          >
            <InputOTP
              value={otp}
              onChange={(value) => setOtp(value)}
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code send to your email.
            </p>
            <Button
              type="submit"
              disabled={emailPending || !isOtpCompleted}
              onClick={verifyOtp}
            >
              {emailPending ? (
                <>
                  <Loader className="animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                "Verify Request"
              )}
            </Button>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

const VerifyRequest = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyRequestContent />
    </Suspense>
  );
};

export default VerifyRequest;
