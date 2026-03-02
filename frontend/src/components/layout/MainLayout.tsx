// src/components/layout/MainLayout.tsx

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";

const MainLayout = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const firstLetter = user?.name?.charAt(0).toUpperCase();

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f4" }}>
      {/* 🔥 Navbar */}
      <nav
        style={{
          height: "70px",
          background: "#111",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          position: "relative",
        }}
      >
        <h2 style={{ margin: 0 }}>Event AI</h2>

        {/* User Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            position: "relative",
          }}
          onClick={() => setOpen(!open)}
        >
          {/* Avatar */}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "16px",
              color: "#fff",
            }}
          >
            {firstLetter}
          </div>

          <span>Hey {user?.name}</span>

          {/* Dropdown */}
          {open && (
            <div
              style={{
                position: "absolute",
                top: "60px",
                right: 0,
                background: "#fff",
                color: "#111",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                width: "220px",
                padding: "15px",
                zIndex: 1000,
              }}
            >
              <p style={{ margin: "0 0 10px 0", fontWeight: 500 }}>
                {user?.email}
              </p>

              <hr style={{ margin: "10px 0" }} />

              <button
                onClick={logout}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#ef4444",
                  border: "none",
                  color: "#fff",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* 🔥 Page Content */}
      <main style={{ padding: "40px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;