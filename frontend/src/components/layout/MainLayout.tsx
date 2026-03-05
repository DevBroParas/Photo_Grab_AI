import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";

const MainLayout = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const firstLetter = user?.name?.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen">

      {/* Navbar */}
      <nav className="h-20 bg-white flex items-center justify-between px-10 shadow-md">
        <div className="flex items-center"><img src="../src/assets/Logo_3.png" alt="logo" className="h-20" /><h2 className="text-3xl font-bold text-gray-500">Grab Pic</h2></div>

        {/* User Section */}
        <div
          className="flex items-center gap-3 cursor-pointer relative"
          onClick={() => setOpen(!open)}
        >
          <span className="text-xl font-semibold">Hey {user?.name} 👋</span>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#686df4] flex items-center justify-center font-bold text-white">
            {firstLetter}
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute top-15 right-0 bg-white text-black rounded-lg shadow-lg w-55 p-4 z-50">
              <p className="mb-2 font-medium">{user?.email}</p>

              <hr className="my-2" />

              <button
                onClick={logout}
                className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main className="p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;