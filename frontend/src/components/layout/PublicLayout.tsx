

import { Outlet, Link } from "react-router-dom";
import Button from "../ui/Button";

const PublicLayout = () => {
  return (
    <div>

      <nav className="h-20 bg-white flex items-center justify-between px-10 shadow-md "
      >
        <div className="flex items-center"><img src="../src/assets/Logo_3.png" alt="logo" className="h-20" /><h2 className="text-3xl font-bold text-gray-500">Grab Pic</h2></div>

        <div className="flex gap-5">
          <Link to="/login" >
            <Button variant="outline" size="sm">Login</Button>
          </Link>

          <Link to="/register">
            <Button variant="primary" size="sm">Register</Button>
          </Link>
        </div>
      </nav>

      <main style={{ padding: "40px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;