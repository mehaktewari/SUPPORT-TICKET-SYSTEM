import { useState } from "react";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";
import Stats from "./Stats";

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div style={{ padding: 20 }}>
      <TicketForm onCreated={() => setRefresh(refresh + 1)} />
      <Stats refresh={refresh} />
      <TicketList />
    </div>
  );
}

export default App;
