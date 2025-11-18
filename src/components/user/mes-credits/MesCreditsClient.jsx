"use client";

import TransactionCard from "./TransactionCard";

export default function MesCreditsClient({ user, wallet, transactions }) {
    const totalCredits = wallet?.credit ?? 0;
    const totalPoints = wallet?.point ?? 0;

    return (
        <div className="col-lg-8 ps-lg-0">
            <div className="ps-lg-5 pt-lg-5">
                <div className="d-flex align-items-center justify-content-between w-100 mb-4">
                    <div>
                        <h1 className="m-0 fw-bold">Mon solde : {totalCredits} crédits</h1>
                        <p className="text-muted mb-0">Points : {totalPoints}</p>
                    </div>
                </div>

                <div className="row row-cols-1 g-3">
                    {transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <TransactionCard key={transaction.id} transaction={transaction} />
                        ))
                    ) : (
                        <p className="text-center text-muted py-5">
                            Aucune transaction pour le moment.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
