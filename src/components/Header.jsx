import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import AcharyaImg from "../assets/logo.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  const options = [
    {
      label: "Change password",
      action: () => navigate("/ChangePassword"),
    },
    {
      label: "Logout",
      action: () => {
        localStorage.setItem("AcharyaCaseUserDetails", null);
        navigate("/Login");
      },
    },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("AcharyaCaseUserDetails"))?.token)
      navigate("/Login");
  }, []);

  return (
    <>
      <AppBar component="nav" color="headerWhite" elevation={2}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img
              src={AcharyaImg}
              alt="Acharya"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </Typography>

          <Tooltip title="Vignesh">
            <Button
              onClick={handleOpenUserMenu}
              color="secondary"
              sx={{ borderRadius: 50, minWidth: 0, p: 0, ml: 1.5 }}
            >
              <AccountCircleIcon sx={{ fontSize: "3rem" }} />
            </Button>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {options.map((op) => (
              <MenuItem
                key={op.label}
                onClick={() => {
                  op.action();
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">{op.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <Box mt={7.5}>
        <Outlet />
      </Box>
    </>
  );
}

export default Header;
