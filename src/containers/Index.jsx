import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableData from "../components/TableData";

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
            color: "#557",
            fontWeight: 500,
          }}
        >
          Cases
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
      <TableData />
    </Box>
  );
}

export default Index;
