import { useState } from "react";
import api from "./api";

export default function TicketForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [priority, setPriority] = useState("low");
  const [loading, setLoading] = useState(false);

  const classify = async () => {
    if (!description) return;
    setLoading(true);
    try {
      const res = await api.post("tickets/classify/", { description });
      setCategory(res.data.suggested_category);
      setPriority(res.data.suggested_priority);
    } catch {
      // fail silently
    }
    setLoading(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    await api.post("tickets/", {
      title,
      description,
      category,
      priority,
    });
    setTitle("");
    setDescription("");
    onCreated();
  };

  return (
    <form onSubmit={submit}>
      <h2>Create Ticket</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onBlur={classify}
        required
      />

      {loading && <p>Classifying with AI...</p>}

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="billing">Billing</option>
        <option value="technical">Technical</option>
        <option value="account">Account</option>
        <option value="general">General</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}
