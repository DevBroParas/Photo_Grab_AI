

import { Outlet, Link } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>

      <nav className="h-20 bg-white flex items-center justify-between px-10 shadow-md "
      >
        <div className="flex items-center"><img src="../src/assets/Logo_3.png" alt="logo" className="h-20" /><h2 className="text-3xl font-bold text-gray-500">Grab Pic</h2></div>

        <div className="flex gap-5">
          <Link to="/login" className="text-[#686df4] px-4 py-2 border border-[#686df4] rounded-full active:bg-[#686df4] active:text-white duration-75">
            Login
          </Link>
          <Link to="/register" className="bg-[#686df4] px-4 py-2 rounded-full text-white active:bg-white active:text-[#686df4] duration-75 active:border active:border-[#686df4]">
            Register
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