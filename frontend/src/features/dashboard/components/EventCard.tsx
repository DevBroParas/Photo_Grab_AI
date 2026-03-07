import { useNavigate } from "react-router-dom";

type Event = {
  id: string;
  name: string;
};

type Props = {
  event: Event;
  onClick?: () => void;
};

const EventCard = ({ event }: Props) => {


  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded-lg shadow-md " onClick={() => navigate(`/events/${event.id}`)}>
      <h2 className="text-lg font-semibold">{event.name}</h2>
      <p>ID: {event.id}</p>
    </div>
  );
};

export default EventCard;