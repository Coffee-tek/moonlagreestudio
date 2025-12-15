
import { Sidebar } from "@/components/user/sidebar";
import { auth } from "../../../lib/auth";
import prisma from "../../../lib/prisma";
import { achatPackService } from "../../../services/achatPackService";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function MesPoints() {

    const h = headers();
    const session = await auth.api.getSession({ headers: h });

    if (!session) {
        redirect("/auth/connexion");
    }

    // 🔹 Récupérer le wallet et vérifier expiration
    const wallet = await achatPackService.verifierExpirationWallet(session.user.id);

    // 🔹 Récupérer le user et ses transactions
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            wallet: {
                include: {
                    transactions: {
                        where: { category: "points" },
                        orderBy: { createdAt: "desc" },
                    },
                },
            },
        },
    });

    if (!user) {
        redirect("/auth/connexion");
    }
    

    const transactions = user?.wallet?.transactions || [];


    return (

        <div className="row">

            {/* Sidebar */}
            <Sidebar users={session.user}  />

            {/* Main content */}
            <div className="col-lg-8 ps-lg-0">
                <div className="ps-lg-5 pt-lg-5">
                    <div className="d-flex align-items-center justify-content-between w-100 mb-5">
                        <h1 className="m-0 fw-bold">Mes Points ( {user?.wallet?.point} points)</h1>
                    </div>
                    <div>
                        <div className="row row-cols-xl-1 row-cols-lg-1 row-cols-md-1 row-cols-1 g-3"
                            style={{
                                maxHeight: "500px",
                                overflowY: "auto",
                            }}
                        >
                            {transactions.map((transaction) => (
                                <div key={transaction.id} className="col">
                                    <div className="d-flex align-items-center justify-content-between bg-white border px-4 py-4 rounded-4">
                                        <div className="w-75">
                                            <div className="d-flex align-items-center gap-3 osahan-mb-1">
                                                <i className={`ri-${transaction.type === "credit" ? 'add' : 'subtract'}-line text-muted fs-5`}></i>
                                                <div className="lh-sm">
                                                    <h4 className={`fw-bold ${transaction.type === "credit" ? 'text-secondary' : 'text-primary'} mb-2`}>
                                                        {transaction.type}
                                                    </h4>
                                                    <p className="text-truncate mb-2 small text-muted">
                                                        {transaction.description || "Aucune description"}
                                                    </p>
                                                    <p className="text-truncate mb-2 small">
                                                        {/* Transaction ID: {transaction.id} */}
                                                    </p>
                                                    <small className="text-muted">
                                                        {new Date(transaction.createdAt).toLocaleString()}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ms-auto d-flex align-items-center gap-3 text-center small">
                                            <span className={`${transaction.type === "credit" ? 'text-secondary' : 'text-primary'} fw-bold h5 m-0`}>
                                                {transaction.type === "credit" ? "+" : "-"}
                                                {transaction.montant} points
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}