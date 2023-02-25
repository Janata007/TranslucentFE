import "./styles/App.css";

import { ROUTES } from "./constants/routes";
import AppProvider from "./context/ContextProvider";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
