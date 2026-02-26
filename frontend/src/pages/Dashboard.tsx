import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

interface Event {
  id: string;
  name: string;
  slug: string;
}

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check user session
    api.get("/auth/me")
      .then(() => {
        return api.get("/events");
      })
      .then(res => {
        setEvents(res.data);
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Your Events</h1>

      <button onClick={() => navigate("/create-event")}>
        Create New Event
      </button>

      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;