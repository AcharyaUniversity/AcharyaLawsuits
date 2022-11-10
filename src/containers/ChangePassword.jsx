import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAlert from "../hooks/useAlert";
import axios from "../api/axios";

function ChangePassword() {
  const [values, setValues] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { setAlertMessage, setAlertOpen } = useAlert();
  const navigate = useNavigate();
  const username = JSON.parse(
    localStorage.getItem("AcharyaCaseUserDetails")
  )?.username;

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

    if (values.password !== values.confirmPassword) {
      setAlertMessage({
        severity: "error",
        title: "Passwords do not match",
      });
      setAlertOpen(true);
      return;
    }

    await axios
      .put(
        `api/updatelegalDepartmentUsers?legal_department_user_name=${username}&legal_department_user_password=${values.password}`
      )
      .then((res) => {
        setAlertMessage({
          severity: "success",
          title: "Password Changed",
          message: "Password has been updated. Please login.",
        });
        setAlertOpen(true);
        localStorage.setItem("AcharyaCaseUserDetails", null);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setAlertMessage({
          severity: "error",
          title: "Error",
          message: err.response
            ? err.response.data.message
            : "An error occured",
        });
        setAlertOpen(true);
        console.error(err);
      });
  };

  return (
    <Box sx={{ background: "#eef", height: "100vh", pt: 6 }}>
      <Typography
        variant="h1"
        sx={{
          color: "#000b",
          fontSize: "3rem !important ",
          textAlign: "center",
        }}
      >
        Change Password
      </Typography>
      <Paper
        sx={{
          width: "91%",
          maxWidth: 666,
          margin: "30px auto",
          p: 4,
          borderRadius: 3,
          textAlign: "right",
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
            <InputLabel>New Password</InputLabel>
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
              label="New Password"
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={values.confirmPassword}
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
              label="Confirm Password"
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{ fontSize: "1.1rem", borderRadius: 2 }}
          >
            <strong>Change</strong>
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default ChangePassword;
