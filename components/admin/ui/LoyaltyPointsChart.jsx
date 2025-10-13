"use client";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

// ✅ DONNÉES FICTIVES PAR DÉFAUT
const FAKE_USERS = [
  { id: 1, name: "Sophie Martin", avatar: "https://i.pravatar.cc/150?img=1", points: 856, credits: 45 },
  { id: 2, name: "Lucas Dubois", avatar: "https://i.pravatar.cc/150?img=2", points: 723, credits: 38 },
  { id: 3, name: "Emma Bernard", avatar: "https://i.pravatar.cc/150?img=3", points: 689, credits: 42 },
  { id: 4, name: "Thomas Petit", avatar: "https://i.pravatar.cc/150?img=4", points: 612, credits: 31 },
  { id: 5, name: "Léa Moreau", avatar: "https://i.pravatar.cc/150?img=5", points: 578, credits: 29 },
  { id: 6, name: "Nathan Laurent", avatar: "https://i.pravatar.cc/150?img=6", points: 534, credits: 27 },
  { id: 7, name: "Chloé Simon", avatar: "https://i.pravatar.cc/150?img=7", points: 489, credits: 25 },
  { id: 8, name: "Hugo Michel", avatar: "https://i.pravatar.cc/150?img=8", points: 445, credits: 23 },
  { id: 9, name: "Inès Garcia", avatar: "https://i.pravatar.cc/150?img=9", points: 401, credits: 21 },
  { id: 10, name: "Louis Martinez", avatar: "https://i.pravatar.cc/150?img=10", points: 367, credits: 19 },
  { id: 11, name: "Camille Robert", avatar: "https://i.pravatar.cc/150?img=11", points: 334, credits: 17 },
  { id: 12, name: "Arthur Richard", avatar: "https://i.pravatar.cc/150?img=12", points: 289, credits: 15 },
  { id: 13, name: "Zoé Durand", avatar: "https://i.pravatar.cc/150?img=13", points: 256, credits: 13 },
  { id: 14, name: "Gabriel Leroy", avatar: "https://i.pravatar.cc/150?img=14", points: 223, credits: 11 },
  { id: 15, name: "Juliette Moreau", avatar: "https://i.pravatar.cc/150?img=15", points: 189, credits: 9 },
  { id: 16, name: "Raphaël Girard", avatar: "https://i.pravatar.cc/150?img=16", points: 156, credits: 8 },
  { id: 17, name: "Alice Lefebvre", avatar: "https://i.pravatar.cc/150?img=17", points: 134, credits: 7 },
  { id: 18, name: "Jules Fontaine", avatar: "https://i.pravatar.cc/150?img=18", points: 112, credits: 6 },
  { id: 19, name: "Rose Blanc", avatar: "https://i.pravatar.cc/150?img=19", points: 89, credits: 5 },
  { id: 20, name: "Adam Roussel", avatar: "https://i.pravatar.cc/150?img=20", points: 67, credits: 3 },
];

export default function LoyaltyPointsChart({ users = [] }) {
  const [displayUsers, setDisplayUsers] = useState([]);

  useEffect(() => {
    // ✅ Si aucun utilisateur fourni, utiliser les données fictives
    setDisplayUsers(users.length > 0 ? users : FAKE_USERS);
  }, [users]);

  // ✅ Fonction utilitaire pour obtenir une valeur sûre
  const safeValue = (value, fallback = 0) =>
    typeof value === "number" && !isNaN(value) ? value : fallback;

  // ✅ Calculer les statistiques
  const calculateStats = () => {
    const totalPoints = displayUsers.reduce(
      (acc, user) => acc + safeValue(user.points),
      0
    );
    const avgPoints =
      displayUsers.length > 0 ? (totalPoints / displayUsers.length).toFixed(0) : 0;
    const maxPoints =
      displayUsers.length > 0
        ? Math.max(...displayUsers.map((u) => safeValue(u.points)))
        : 0;
    const minPoints =
      displayUsers.length > 0
        ? Math.min(...displayUsers.map((u) => safeValue(u.points)))
        : 0;

    const topUsers = [...displayUsers]
      .sort((a, b) => safeValue(b.points) - safeValue(a.points))
      .slice(0, 5);

    const ranges = [
      { name: "0-200", count: 0, min: 0, max: 200 },
      { name: "201-400", count: 0, min: 201, max: 400 },
      { name: "401-600", count: 0, min: 401, max: 600 },
      { name: "601-800", count: 0, min: 601, max: 800 },
      { name: "801+", count: 0, min: 801, max: Infinity },
    ];

    displayUsers.forEach((user) => {
      const points = safeValue(user.points);
      const range = ranges.find((r) => points >= r.min && points <= r.max);
      if (range) range.count++;
    });

    return {
      totalPoints,
      avgPoints,
      maxPoints,
      minPoints,
      topUsers,
      distribution: ranges,
    };
  };

  const stats = calculateStats();

  // ✅ Graphique en aires (Top 10)
  const lineData = [...displayUsers]
    .sort((a, b) => safeValue(b.points) - safeValue(a.points))
    .slice(0, 10)
    .map((user, index) => ({
      name: user.name ? user.name.split(" ")[0] : `U${index + 1}`,
      points: safeValue(user.points),
      credits: safeValue(user.credits),
    }));

  // ✅ Graphique radar (Top 5)
  const radarData = stats.topUsers.map((user, index) => ({
    name: user.name ? user.name.split(" ")[0] : `U${index + 1}`,
    points: safeValue(user.points),
    fullMark: safeValue(stats.maxPoints, 100),
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="points">{`Points: ${payload[0].value}`}</p>
          {payload[1] && (
            <p className="credits">{`Crédits: ${payload[1].value}`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="row g-4 mt-3">
      {/* --- CARTES DE STATS --- */}
      <div className="col-12">
        <div className="row g-3">
          {[
            {
              color: "bg-warning",
              icon: "bi bi-star-fill",
              label: "Total Points",
              value: stats.totalPoints.toLocaleString(),
            },
            {
              color: "bg-info",
              icon: "bi bi-graph-up-arrow",
              label: "Moyenne",
              value: stats.avgPoints,
            },
            {
              color: "bg-success",
              icon: "bi bi-trophy-fill",
              label: "Maximum",
              value: stats.maxPoints,
            },
            {
              color: "bg-primary",
              icon: "bi bi-people-fill",
              label: "Utilisateurs",
              value: displayUsers.length,
            },
          ].map((card, i) => (
            <div key={i} className="col-md-3 col-sm-6">
              <div className="card stats-card">
                <div className="card-body d-flex align-items-center">
                  <div className={`stats-icon ${card.color}`}>
                    <i className={card.icon}></i>
                  </div>
                  <div className="ms-3">
                    <h6 className="text-muted mb-1">{card.label}</h6>
                    <h3 className="mb-0">{card.value}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- GRAPHIQUE EN AIRES --- */}
      <div className="col-lg-8 col-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">
              <i className="bi bi-graph-up me-2"></i>
              Top 10 - Points et Crédits
            </h5>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="points"
                  stroke="#ffc107"
                  fill="#ffc107"
                  fillOpacity={0.6}
                  name="Points"
                />
                <Area
                  type="monotone"
                  dataKey="credits"
                  stroke="#727cf5"
                  fill="#727cf5"
                  fillOpacity={0.6}
                  name="Crédits"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- GRAPHIQUE RADAR --- */}
      <div className="col-lg-4 col-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">
              <i className="bi bi-bullseye me-2"></i>
              Top 5 Utilisateurs
            </h5>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={90} domain={[0, stats.maxPoints || 1000]} />
                <Radar
                  name="Points"
                  dataKey="points"
                  stroke="#28a745"
                  fill="#28a745"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- DISTRIBUTION PAR TRANCHES --- */}
      <div className="col-lg-6 col-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">
              <i className="bi bi-pie-chart-fill me-2"></i>
              Distribution des points
            </h5>
          </div>
          <div className="card-body">
            {stats.distribution.map((range, index) => (
              <div key={range.name} className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-semibold">{range.name} points</span>
                  <span className="text-muted">{range.count} utilisateurs</span>
                </div>
                <div className="progress" style={{ height: "10px" }}>
                  <div
                    className={`progress-bar bg-${
                      ["danger", "warning", "info", "primary", "success"][index]
                    }`}
                    style={{
                      width: `${
                        displayUsers.length > 0
                          ? (range.count / displayUsers.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- TABLEAU TOP 5 --- */}
      <div className="col-lg-6 col-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">
              <i className="bi bi-award-fill me-2"></i>
              Classement Top 5
            </h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Utilisateur</th>
                    <th className="text-end">Points</th>
                    <th className="text-end">Crédits</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topUsers.map((user, index) => (
                    <tr key={user.id || index}>
                      <td>
                        <span
                          className={`badge ${
                            index === 0
                              ? "bg-warning"
                              : index === 1
                              ? "bg-secondary"
                              : index === 2
                              ? "bg-danger"
                              : "bg-light text-dark"
                          }`}
                        >
                          {["🥇", "🥈", "🥉"][index] || index + 1}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={
                              user.avatar ||
                              "https://via.placeholder.com/30?text=U"
                            }
                            alt={user.name || "Utilisateur"}
                            className="rounded-circle me-2"
                            width="30"
                            height="30"
                          />
                          <span>{user.name || "Anonyme"}</span>
                        </div>
                      </td>
                      <td className="text-end fw-bold text-warning">
                        {safeValue(user.points)}
                      </td>
                      <td className="text-end fw-bold text-primary">
                        {safeValue(user.credits)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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
        .stats-icon.bg-warning {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .stats-icon.bg-info {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        .stats-icon.bg-success {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }
        .stats-icon.bg-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
        .custom-tooltip .points,
        .custom-tooltip .credits {
          margin: 3px 0;
          font-size: 0.9rem;
        }
        .progress {
          background-color: #e9ecef;
          border-radius: 10px;
          overflow: hidden;
        }
        .table th {
          font-weight: 600;
          color: #6c757d;
          font-size: 0.875rem;
          text-transform: uppercase;
        }
        .table td {
          vertical-align: middle;
        }
        @media (max-width: 768px) {
          .stats-card {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
}