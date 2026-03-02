

import { Outlet, Link } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      {/* Public Navbar */}
      <nav
        style={{
          height: "70px",
          background: "#111",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
        }}
      >
        <h2>Event AI</h2>

        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/login" style={{ color: "#fff" }}>
            Login
          </Link>
          <Link to="/register" style={{ color: "#fff" }}>
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