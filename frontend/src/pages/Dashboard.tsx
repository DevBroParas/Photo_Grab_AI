import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Event {
    id: string;
    name: string;
    slug: string;
}

const Dashboard = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/");
            return;
        }

        if (user) {
            api.get("/events")
                .then(res => setEvents(res.data))
                .catch(() => navigate("/"));
        }
    }, [user, loading]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <button onClick={logout}>Logout</button>

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