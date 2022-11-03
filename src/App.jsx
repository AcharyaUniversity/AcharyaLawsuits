import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Box } from "@mui/material";
import ThemeContextProvider from "./contexts/ThemeContextProvider";
import AlertContextProvider from "./contexts/AlertContextProvider";
import Header from "./components/Header";
import Index from "./containers/Index";
import Form from "./containers/Form";
import Report from "./components/Report";

function App() {
  return (
    <ThemeContextProvider>
      <AlertContextProvider>
        <Router>
          <Header />
          <Box mt={7.5}>
            <Routes>
              <Route exact path="/" element={<Navigate to="/Index" />} />
              <Route exact path="/Index" element={<Index />} />
              <Route exact path="/CaseForm/New" element={<Form />} />
              <Route exact path="/CaseForm/Update/:id" element={<Form />} />
              <Route exact path="/CaseForm/AddHearing/:id" element={<Form />} />
              <Route exact path="/Report/:id" element={<Report />} />
            </Routes>
          </Box>
        </Router>
      </AlertContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
