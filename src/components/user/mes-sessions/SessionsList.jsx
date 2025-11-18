import SessionCard from "./SessionCard";

export default function SessionsList({ status, sessions, setSessions }) {
  const filtered = sessions.filter((s) => {
    if (status === "reserved") return [ "confirme","en_attente"].includes(s.statut);;
    if (status === "cancelled") return s.statut === "annule";
    if (status === "history") return ["terminée", "confirmée", "annule","en_attente"].includes(s.statut);
    return false;
  });

  if (!filtered.length)
    return <p className="text-center text-muted py-5">Aucune session {status}.</p>;

  return (
    <div className="bg-white p-4 rounded-3 shadow-sm">
      {filtered.map((s) => (
        <SessionCard
          key={s.reservationId || s.id} // clé unique pour React
          session={s}
          sessions={sessions}
          setSessions={setSessions} // pour mettre à jour le state depuis SessionCard
        />
      ))}
    </div>
  );
}
