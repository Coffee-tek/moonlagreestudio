import SessionsList from "./SessionsList";

export default function SessionTabs({
    activeTab,
    setActiveTab,
    sessions,
    setSessions
}) {
    const tabs = [
        { id: "reserved", label: "Réservée(s)" },
        { id: "cancelled", label: "Annulée(s)" },
        { id: "history", label: "Historique" },
    ];

    return (
        <>
            <ul className="nav nav-pills justify-content-center bg-light p-2 nav-fill">
                {tabs.map((tab) => (
                    <li className="nav-item" key={tab.id}>
                        <button
                            className={`nav-link py-2 px-4 ${activeTab === tab.id ? "active" : ""}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="tab-content mt-4">
                <SessionsList
                    status={activeTab}
                    sessions={sessions}
                    setSessions={setSessions}
                />
            </div>
        </>
    );
}
