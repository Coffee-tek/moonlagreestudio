import { ReturnButton } from "../../../../components/ReturnButton";

export default function Page() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-4">
        <ReturnButton href="/auth/connexion" label="Connexion" />

        <h1 className="text-3xl font-bold">Success</h1>

        <p className="text-muted-foreground">
        Félicitations ! Votre inscription a bien été prise en compte. Veuillez consulter votre boîte mail pour obtenir le lien de vérification.
        </p>
      </div>
    </div>
  );
}