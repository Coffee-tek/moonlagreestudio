"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function TransactionCard({ transaction }) {
  const formattedDate = format(new Date(transaction.createdAt), "PPPpp", { locale: fr });

  const isPositive =
    transaction.type === "credit" || transaction.type === "recharge";

  return (
    <div className="col p-1">
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between bg-white border px-3 py-3 rounded-4 shadow-sm">
        <div className="w-100 w-md-75 mb-2 mb-md-0">
          <div className="d-flex align-items-start align-items-md-center gap-3 flex-wrap">
            <i
              className={`ri-${isPositive ? "add" : "subtract"}-line text-muted fs-5`}
            ></i>
            <div className="lh-sm">
              <h4
                className={`fw-bold ${isPositive ? "text-success" : "text-danger"
                  } mb-1`}
              >
                {transaction.type}
              </h4>
              <p className="text-truncate mb-1 small text-muted">
                {transaction.description || "Aucune description"}
              </p>
              <small className="text-muted">{formattedDate}</small>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3 text-center small mt-2 mt-md-0">
          <span
            className={`${isPositive ? "text-success" : "text-danger"
              } fw-bold h5 m-0`}
          >
            {isPositive ? "+" : "-"}
            {transaction.montant} crédits
          </span>
        </div>
      </div>

    </div>
  );
}
