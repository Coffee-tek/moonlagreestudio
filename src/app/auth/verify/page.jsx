import { redirect } from "next/navigation";
import { SendVerificationEmailForm } from "../../../components/auth/SendVerificationEmailForm";
import { ReturnButton } from "../../../components/ReturnButton";

export default async function Page({ searchParams }) {
  const { error } = await searchParams;

  if (!error) redirect("/user/profile-setting");

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-4">
        <ReturnButton href="/auth/connexion" label="Connexion" />

        <h1 className="text-3xl font-bold">Verifier l'email</h1>
      </div>

      <p className="text-destructive">
        <span className="capitalize">
          {error.replace(/_/g, " ").replace(/-/g, " ")}
        </span>{" "}
     - Veuillez demander un nouvel e-mail de vérification.
      </p>

      <SendVerificationEmailForm />
    </div>
  );
}
