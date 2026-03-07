import { useParams } from "react-router-dom";

const EventPage = () => {
  const { eventId } = useParams();

  return (
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Upload Photos
        </h1>

        <p>
          Event ID: {eventId}
        </p>

      </div>    
  );
};

export default EventPage;