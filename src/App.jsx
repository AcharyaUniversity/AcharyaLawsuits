import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ThemeContextProvider from "./contexts/ThemeContextProvider";
import Form from "./containers/Form";

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Routes>
          <Route exact path="/caseForm" element={<Form />}></Route>
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
