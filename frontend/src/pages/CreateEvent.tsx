import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await api.post("/events", { name });
      navigate("/dashboard");
    } catch (error) {
      alert("Error creating event");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Create Event</h1>

      <input
        type="text"
        placeholder="Event name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
};

export default CreateEvent;