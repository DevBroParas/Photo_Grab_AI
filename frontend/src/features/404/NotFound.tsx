import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">

      <div className="text-center max-w-xl">

        <h1 className="text-8xl font-bold text-[#686df4] mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 mb-8">
          The page you are looking for doesn’t exist or may have been moved.
        </p>

        <Button
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </Button>

      </div>

    </div>
  );
};

export default NotFound;