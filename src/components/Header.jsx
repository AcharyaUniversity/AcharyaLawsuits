import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AcharyaImg from "../assets/logo.jpg";

function Header() {
  const navigate = useNavigate();

  return (
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
      </Toolbar>
    </AppBar>
  );
}

export default Header;
