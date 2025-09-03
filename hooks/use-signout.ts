"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSignout() {
  const router = useRouter();
  async function HandleSignout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess() {
          router.push("/");
          toast.success("Logged out successfully");
        },
        onError(error) {
          toast.error(error.error?.message);
        },
      },
    });
  }
  return { HandleSignout };
}
