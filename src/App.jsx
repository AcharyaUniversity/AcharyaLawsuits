import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ThemeContextProvider from "./contexts/ThemeContextProvider";
import AlertContextProvider from "./contexts/AlertContextProvider";
import Header from "./components/Header";
import Login from "./containers/Login";
import Index from "./containers/Index";
import Form from "./containers/Form";
import Report from "./components/Report";

function App() {
  const token = localStorage.getItem("token");

  return (
    <ThemeContextProvider>
      <AlertContextProvider>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                token ? <Navigate to="/Index" /> : <Navigate to="/Login" />
              }
            />
            <Route exact path="/Login" element={<Login />} />

            <Route element={<Header />}>
              <Route exact path="/Index" element={<Index />} />
              <Route exact path="/CaseForm/New" element={<Form />} />
              <Route exact path="/CaseForm/Update/:id" element={<Form />} />
              <Route exact path="/CaseForm/AddHearing/:id" element={<Form />} />
              <Route exact path="/Report/:id" element={<Report />} />
            </Route>
          </Routes>
        </Router>
      </AlertContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
