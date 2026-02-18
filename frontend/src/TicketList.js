import { useEffect, useState } from "react";
import api from "./api";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);

  const load = async () => {
    const res = await api.get("tickets/");
    setTickets(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`tickets/${id}/`, { status });
    load();
  };

  return (
    <>
      <h2>Tickets</h2>
      {tickets.map((t) => (
        <div key={t.id} style={{ border: "1px solid #ccc", margin: 5 }}>
          <h4>{t.title}</h4>
          <p>{t.description.slice(0, 100)}</p>
          <p>
            {t.category} | {t.priority} | {t.status}
          </p>
          <select
            value={t.status}
            onChange={(e) => updateStatus(t.id, e.target.value)}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      ))}
    </>
  );
}
