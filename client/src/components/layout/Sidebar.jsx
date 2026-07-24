import {
  Dashboard,
  Group,
  EventAvailable,
  Assessment,
  Logout,
} from "@mui/icons-material";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/staff-dashboard",
    },
    {
      text: "Members",
      icon: <Group />,
      path: "/members",
    },
    {
      text: "Attendance",
      icon: <EventAvailable />,
      path: "/attendance",
    },
    {
      text: "Reports",
      icon: <Assessment />,
      path: "/reports",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">
          Incubation Cell
        </Typography>
      </Toolbar>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}

        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default Sidebar;