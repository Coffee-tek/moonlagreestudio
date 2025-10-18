"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Données fictives avec dates (tu peux remplacer par tes vraies sessions)
const FAKE_SESSIONS = [
  { id: "#SES00001", date: "2025-01-15", totalPlaces: 20, bookedPlaces: 20, remainingPlaces: 0, status: "Complet" },
  { id: "#SES00002", date: "2025-02-10", totalPlaces: 25, bookedPlaces: 24, remainingPlaces: 1, status: "Presque complet" },
  { id: "#SES00003", date: "2025-02-18", totalPlaces: 15, bookedPlaces: 12, remainingPlaces: 3, status: "Presque complet" },
  { id: "#SES00004", date: "2025-03-01", totalPlaces: 30, bookedPlaces: 22, remainingPlaces: 8, status: "Disponible" },
  { id: "#SES00005", date: "2025-03-20", totalPlaces: 18, bookedPlaces: 18, remainingPlaces: 0, status: "Complet" },
  { id: "#SES00006", date: "2025-04-05", totalPlaces: 22, bookedPlaces: 15, remainingPlaces: 7, status: "Disponible" },
  { id: "#SES00007", date: "2025-05-15", totalPlaces: 20, bookedPlaces: 18, remainingPlaces: 2, status: "Presque complet" },
  { id: "#SES00008", date: "2025-05-27", totalPlaces: 25, bookedPlaces: 10, remainingPlaces: 15, status: "Disponible" },
  { id: "#SES00009", date: "2025-06-03", totalPlaces: 16, bookedPlaces: 16, remainingPlaces: 0, status: "Complet" },
  { id: "#SES00010", date: "2025-07-09", totalPlaces: 28, bookedPlaces: 20, remainingPlaces: 8, status: "Disponible" },
  { id: "#SES00011", date: "2025-08-11", totalPlaces: 20, bookedPlaces: 17, remainingPlaces: 3, status: "Presque complet" },
  { id: "#SES00012", date: "2025-09-18", totalPlaces: 24, bookedPlaces: 14, remainingPlaces: 10, status: "Disponible" },
  { id: "#SES00013", date: "2025-10-01", totalPlaces: 15, bookedPlaces: 15, remainingPlaces: 0, status: "Complet" },
];

export default function SessionStatsChart({ sessions = [] }) {
  const [displaySessions, setDisplaySessions] = useState([]);

  useEffect(() => {
    setDisplaySessions(sessions.length > 0 ? sessions : FAKE_SESSIONS);
  }, [sessions]);

  // 📊 Fonction pour grouper les sessions par mois et calculer le taux moyen
  const getMonthlyData = () => {
    const grouped = {};

    displaySessions.forEach((session) => {
      const date = new Date(session.date);
      const month = date.toLocaleString("fr-FR", { month: "short" });
      const year = date.getFullYear();
      const key = `${month} ${year}`;

      const taux = (session.bookedPlaces / session.totalPlaces) * 100;

      if (!grouped[key]) {
        grouped[key] = { month: key, total: 0, sumTaux: 0, count: 0 };
      }

      grouped[key].total += session.totalPlaces;
      grouped[key].sumTaux += taux;
      grouped[key].count += 1;
    });

    // Transformer en tableau exploitable par Recharts
    return Object.values(grouped).map((m) => ({
      month: m.month,
      taux: (m.sumTaux / m.count).toFixed(1),
    }));
  };

  const monthlyData = getMonthlyData();

  // 🔹 Calcul des stats globales
  const complet = displaySessions.filter((s) => s.status === "Complet").length;
  const presqueComplet = displaySessions.filter((s) => s.status === "Presque complet").length;
  const disponible = displaySessions.filter((s) => s.status === "Disponible").length;
  const avgFillRate =
    displaySessions.length > 0
      ? (
          displaySessions.reduce((acc, s) => acc + (s.bookedPlaces / s.totalPlaces) * 100, 0) /
          displaySessions.length
        ).toFixed(1)
      : 0;

  const pieData = [
    { name: "Complet", value: complet, color: "#dc3545" },
    { name: "Presque complet", value: presqueComplet, color: "#ffc107" },
    { name: "Disponible", value: disponible, color: "#28a745" },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Taux moyen: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="row g-4 mt-3">
        {/* Graphique en barres mensuel */}
        <div className="col-lg-8 col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-bar-chart me-2"></i>
                Taux de remplissage moyen par mois
              </h5>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="taux" fill="#727cf5" radius={[8, 8, 0, 0]} name="Taux (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Graphique en camembert */}
        <div className="col-lg-4 col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-pie-chart me-2"></i>
                Répartition des sessions
              </h5>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-tooltip {
          background: white;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
}
