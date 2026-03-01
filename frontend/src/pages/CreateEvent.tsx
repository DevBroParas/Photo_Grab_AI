import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CreateEvent = () => {
  const [name, setName] = useState("");
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
      return;
    }
  }, [user, loading]);

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