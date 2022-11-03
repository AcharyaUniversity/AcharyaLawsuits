import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bg from "../assets/background.jpg";
import axios from "axios";
import apiUrl from "../services/api";

function Login() {
  const [values, setValues] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const temp = {
      active: true,
      legal_department_user_name: values.username,
      legal_department_user_password: values.password,
    };
    await axios
      .post(`${apiUrl}/legalDepartmentUsers`, temp)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        pt: 6,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "#000a",
          fontSize: "3rem !important ",
          textAlign: "center",
        }}
      >
        Acharya Institutes cases
      </Typography>
      <Paper
        sx={{
          width: "91%",
          maxWidth: 666,
          margin: "80px auto",
          p: 4,
          borderRadius: 3,
          textAlign: "right",
          background: "#fff7",
          backdropFilter: "blur(23px)",
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="username"
            label="Username"
            value={values.username}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{ fontSize: "1.1rem", borderRadius: 2 }}
          >
            <strong>Login</strong>
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
