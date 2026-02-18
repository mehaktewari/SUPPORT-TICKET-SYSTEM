import { useEffect, useState } from "react";
import api from "./api";

export default function Stats({ refresh }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("tickets/stats/").then((res) => setStats(res.data));
  }, [refresh]);

  if (!stats) return null;

  return (
    <>
      <h2>Stats</h2>
      <p>Total: {stats.total_tickets}</p>
      <p>Open: {stats.open_tickets}</p>
      <p>Avg/day: {stats.avg_tickets_per_day}</p>
    </>
  );
}
