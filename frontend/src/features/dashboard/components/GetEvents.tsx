import { useEffect, useState } from "react";
import { getEvents } from "../../../services/EventService";
import { toast } from "sonner";
import EventCard from "./EventCard";
import GlobalLoader from "../../../components/ui/GlobalLoader";

type Event = {
  id: string;
  name: string;
};

const GetEvents = () => {
  const [data, setData] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await getEvents();
        setData(response);
      } catch (error: any) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  if (loading) return <GlobalLoader />;

  return (
    <div>
      <h1>Events</h1>

      {data.length === 0 ? (
        <p>No events found</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {data.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GetEvents;