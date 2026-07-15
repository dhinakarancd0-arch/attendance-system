import {
  Dashboard,
  People,
  Event,
  Assessment,
  Download,
  Logout,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      title: "Dashboard",
      icon: <Dashboard />,
      path: "/staff-dashboard",
    },
    {
      title: "Members",
      icon: <People />,
      path: "/members",
    },
    {
      title: "Attendance",
      icon: <Event />,
      path: "/attendance",
    },
    {
      title: "Reports",
      icon: <Assessment />,
      path: "/reports",
    },
  ];

  return (
    <div
      className="sidebar"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "25px 0 35px",
        }}
      >
        <img
          src="/sankara-logo.png"
          alt="Sankara Logo"
          style={{
            width: "120px",
            height: "auto",
          }}
        />
      </div>

      {/* Menu */}

      {menus.map((menu) => (
        <button
          key={menu.title}
          className="menu-item"
          onClick={() => navigate(menu.path)}
          style={{
            background:
              location.pathname === menu.path
                ? "rgba(255,255,255,.18)"
                : "transparent",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {menu.icon}
            {menu.title}
          </span>
        </button>
      ))}

      {/* Export */}

      <button
        className="menu-item"
        onClick={() => {
          const today =
            new Date().toISOString().split("T")[0];

          window.open(
             `https://attendance-system-bozk.onrender.com/api/attendance/export/${today}`,
              "_blank"
           );
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Download />
          Export Excel
        </span>
      </button>

      {/* Logout */}

      <button
        className="menu-item"
        onClick={onLogout}
        style={{
          marginTop: "auto",
          color: "#ffb4b4",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Logout />
          Logout
        </span>
      </button>
    </div>
  );
}

export default Sidebar;