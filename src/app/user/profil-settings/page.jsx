import AccountForm from "../../../components/profile/AccountForm";
import ChangePasswordForm from "../../../components/profile/ChangePasswordForm";
import DeleteAccount from "../../../components/profile/DeleteAccount";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Sidebar } from "../../../components/user/sidebar";
import { redirect } from "next/navigation";

export default async function ProfilSettings() {
  const h = await headers();
  const session = await auth.api.getSession({
    headers: h,
  });

  if (!session) {
    redirect("/auth/connexion");
  }

  // if (session.user.role.toLowerCase() === "admin") {
  //   redirect("/admin"); // redirige les admins vers leur dashboard
  // }
  console.log("aaahhh",session.user);


  return (
    <div className="row">
      {/* Sidebar */}
      <Sidebar users={session.user}/>

      {/* Contenu principal */}
      <div className="col-lg-8 ps-lg-0 pb-5">
        <div className="ps-lg-5 pt-lg-5">
          <div className="d-flex align-items-center justify-content-between w-100 mb-5">
            <h1 className="m-0 fw-bold">Paramètres</h1>
            <pre className="text-sm overflow-clip">

              {/* {JSON.stringify(session, null, 2)} */}

            </pre>
          </div>

          {/* Section Account Details */}
          <div className="bg-white rounded-4 p-4 mb-4 shadow-sm">
            <h5 className="mb-4 text-primary">Détails du compte</h5>
            <AccountForm users={session.user} />
          </div>

          {/* Section Password */}
          <div className="bg-white rounded-4 p-4 mb-4 shadow-sm">
            <h5 className="mb-4 text-primary">Mot de passe</h5>
            <ChangePasswordForm />
          </div>

          {/* Section Delete Account */}
          <div className="bg-white rounded-4 p-4 shadow-sm border border-danger border-opacity-25">
            <h5 className="mb-4 text-danger">Supprimer votre compte</h5>
            <DeleteAccount />
          </div>
        </div>
      </div>
    </div>
  );
}
