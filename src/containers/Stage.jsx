import { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StageTableData from "../components/StageTableData";
import apiUrl from "../services/api";
import axios from "axios";

function Stage() {
  const [stageName, setStageName] = useState("");

  const handleSubmit = async () => {
    await axios
      .post(`${apiUrl}/stageOfTheCase`, {
        active: true,
        stage_of_the_case_name: stageName,
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <Box p={2}>
      <Typography
        component="h1"
        sx={{
          fontSize: "2rem",
          color: "#558",
          mb: 3,
        }}
      >
        Stages
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
        <TextField
          fullWidth
          name="stageName"
          label="Stage name"
          value={stageName}
          onChange={(e) => setStageName(e.target.value)}
          style={{ flexGrow: 1 }}
        />
        <Button
          variant="contained"
          sx={{ height: 50, width: 50, minWidth: 50, ml: 2, borderRadius: 2 }}
          onClick={stageName ? handleSubmit : () => {}}
        >
          <AddIcon />
        </Button>
      </Box>
      <StageTableData />
    </Box>
  );
}

export default Stage;
