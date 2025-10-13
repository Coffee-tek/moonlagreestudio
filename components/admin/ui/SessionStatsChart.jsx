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

// ✅ DONNÉES FICTIVES PAR DÉFAUT
const FAKE_SESSIONS = [
  { id: "#SES00001", totalPlaces: 20, bookedPlaces: 20, remainingPlaces: 0, status: "Complet" },
  { id: "#SES00002", totalPlaces: 25, bookedPlaces: 24, remainingPlaces: 1, status: "Presque complet" },
  { id: "#SES00003", totalPlaces: 15, bookedPlaces: 12, remainingPlaces: 3, status: "Presque complet" },
  { id: "#SES00004", totalPlaces: 30, bookedPlaces: 22, remainingPlaces: 8, status: "Disponible" },
  { id: "#SES00005", totalPlaces: 18, bookedPlaces: 18, remainingPlaces: 0, status: "Complet" },
  { id: "#SES00006", totalPlaces: 22, bookedPlaces: 15, remainingPlaces: 7, status: "Disponible" },
  { id: "#SES00007", totalPlaces: 20, bookedPlaces: 18, remainingPlaces: 2, status: "Presque complet" },
  { id: "#SES00008", totalPlaces: 25, bookedPlaces: 10, remainingPlaces: 15, status: "Disponible" },
  { id: "#SES00009", totalPlaces: 16, bookedPlaces: 16, remainingPlaces: 0, status: "Complet" },
  { id: "#SES00010", totalPlaces: 28, bookedPlaces: 20, remainingPlaces: 8, status: "Disponible" },
  { id: "#SES00011", totalPlaces: 20, bookedPlaces: 17, remainingPlaces: 3, status: "Presque complet" },
  { id: "#SES00012", totalPlaces: 24, bookedPlaces: 14, remainingPlaces: 10, status: "Disponible" },
  { id: "#SES00013", totalPlaces: 15, bookedPlaces: 15, remainingPlaces: 0, status: "Complet" },
  { id: "#SES00014", totalPlaces: 30, bookedPlaces: 25, remainingPlaces: 5, status: "Disponible" },
  { id: "#SES00015", totalPlaces: 18, bookedPlaces: 16, remainingPlaces: 2, status: "Presque complet" },
];

export default function SessionStatsChart({ sessions = [] }) {
  const [displaySessions, setDisplaySessions] = useState([]);

  useEffect(() => {
    // ✅ Si aucune session fournie, utiliser les données fictives
    setDisplaySessions(sessions.length > 0 ? sessions : FAKE_SESSIONS);
  }, [sessions]);

  // Calculer les statistiques de remplissage
  const calculateStats = () => {
    const total = displaySessions.length;
    const complet = displaySessions.filter((s) => s.status === "Complet").length;
    const presqueComplet = displaySessions.filter((s) => s.status === "Presque complet").length;
    const disponible = displaySessions.filter((s) => s.status === "Disponible").length;

    const avgFillRate =
      displaySessions.length > 0
        ? displaySessions.reduce((acc, s) => acc + (s.bookedPlaces / s.totalPlaces) * 100, 0) /
          displaySessions.length
        : 0;

    return {
      total,
      complet,
      presqueComplet,
      disponible,
      avgFillRate: avgFillRate.toFixed(1),
    };
  };

  const stats = calculateStats();

  // Données pour le graphique en camembert
  const pieData = [
    { name: "Complet", value: stats.complet, color: "#dc3545" },
    { name: "Presque complet", value: stats.presqueComplet, color: "#ffc107" },
    { name: "Disponible", value: stats.disponible, color: "#28a745" },
  ];

  // Données pour le graphique en barres (7 dernières sessions)
  const barData = displaySessions.slice(0, 7).map((session, index) => ({
    name: `S${index + 1}`,
    taux: ((session.bookedPlaces / session.totalPlaces) * 100).toFixed(1),
    places: session.bookedPlaces,
    total: session.totalPlaces,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Taux de remplissage: ${payload[0].value}%`}</p>
          <p className="desc">{`Places: ${payload[0].payload.places}/${payload[0].payload.total}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="row g-4 mt-3">
        {/* Cartes de statistiques */}
        <div className="col-12">
          <div className="row g-3">
            {/* Total sessions */}
            <div className="col-md-3 col-sm-6">
              <div className="card stats-card">
                <div className="card-body d-flex align-items-center">
                  <div className="stats-icon bg-primary">
                    <i className="bi bi-calendar-check"></i>
                  </div>
                  <div className="ms-3">
                    <h6 className="text-muted mb-1">Total Sessions</h6>
                    <h3 className="mb-0">{stats.total}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Disponibles */}
            <div className="col-md-3 col-sm-6">
              <div className="card stats-card">
                <div className="card-body d-flex align-items-center">
                  <div className="stats-icon bg-success">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <div className="ms-3">
                    <h6 className="text-muted mb-1">Disponibles</h6>
                    <h3 className="mb-0">{stats.disponible}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Complètes */}
            <div className="col-md-3 col-sm-6">
              <div className="card stats-card">
                <div className="card-body d-flex align-items-center">
                  <div className="stats-icon bg-danger">
                    <i className="bi bi-x-circle"></i>
                  </div>
                  <div className="ms-3">
                    <h6 className="text-muted mb-1">Complètes</h6>
                    <h3 className="mb-0">{stats.complet}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Taux moyen */}
            <div className="col-md-3 col-sm-6">
              <div className="card stats-card">
                <div className="card-body d-flex align-items-center">
                  <div className="stats-icon bg-info">
                    <i className="bi bi-percent"></i>
                  </div>
                  <div className="ms-3">
                    <h6 className="text-muted mb-1">Taux moyen</h6>
                    <h3 className="mb-0">{stats.avgFillRate}%</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Graphique en barres */}
        <div className="col-lg-8 col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-bar-chart me-2"></i>
                Taux de remplissage par session
              </h5>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="taux"
                    fill="#727cf5"
                    radius={[8, 8, 0, 0]}
                    name="Taux (%)"
                  />
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

      {/* ✅ Important : le style doit être dans le même fragment ou balise parent */}
      <style jsx>{`
        .stats-card {
          border: none;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s;
        }

        .stats-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
        }

        .stats-icon {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }

        .stats-icon.bg-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .stats-icon.bg-success {
          background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
        }

        .stats-icon.bg-danger {
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
        }

        .stats-icon.bg-info {
          background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
        }

        .card {
          border: none;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }

        .card-header {
          background: transparent;
          border-bottom: 1px solid #e9ecef;
          padding: 1.25rem;
        }

        .custom-tooltip {
          background: white;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .custom-tooltip .label {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .custom-tooltip .desc {
          color: #666;
          margin: 0;
        }

        @media (max-width: 768px) {
          .stats-card {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </>
  );
}