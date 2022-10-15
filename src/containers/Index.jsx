import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableData from "../components/TableData";
import { useTheme } from "@mui/material";

function Index() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          component="h1"
          sx={{
            fontSize: "2rem",
            color: theme.palette.primary.dark,
          }}
        >
          Cases data
        </Typography>
        <Button
          onClick={() => navigate("/caseForm")}
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
