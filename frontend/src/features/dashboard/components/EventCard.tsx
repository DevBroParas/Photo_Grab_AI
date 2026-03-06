type Event = {
  id: string;
  name: string;
};

type Props = {
  event: Event;
};

const EventCard = ({ event }: Props) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">{event.name}</h2>
      <p>ID: {event.id}</p>
    </div>
  );
};

export default EventCard;