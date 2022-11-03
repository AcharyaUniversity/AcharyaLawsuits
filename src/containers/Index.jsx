import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IndexTableData from "../components/IndexTableData";

function Index() {
  const navigate = useNavigate();

  return (
    <Box p={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: "2rem",
            color: "#558",
          }}
        >
          Index
        </Typography>
        <Button
          onClick={() => navigate("/CaseForm/New")}
          variant="contained"
          sx={{ borderRadius: 2 }}
          startIcon={<AddIcon />}
        >
          Create
        </Button>
      </Box>
      <IndexTableData />
    </Box>
  );
}

export default Index;
