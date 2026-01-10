"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { sendVerificationEmail } from "../../lib/auth-client";

export const SendVerificationEmailForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt) {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const email = String(formData.get("email"));

    if (!email) {
      toast.error("Veuillez saisir votre adresse e-mail.");
      return;
    }

    await sendVerificationEmail({
      email,
      callbackURL: "/auth/verify",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Courriel de vérification envoyé avec succès.");
          router.push("/auth/verify/success");
        },
      },
    });
  }

  return (
    <form className="max-w-sm w-full space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Envoi..." : "Renvoyer l'e-mail de vérification"}
      </Button>
    </form>
  );
};
