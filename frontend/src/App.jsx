import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AppProvider, AppContext } from "./context/appContext.js";
import Main from "./layouts/Main.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

const App = () => {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </AppProvider>
    </Router>
  );
};

// auth değilse erişimi kısıtla!
const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AppContext);

  return user ? children : <Navigate to="/login" />;
};

// auth ise login/register'a erişimi kısıtla!
const PublicRoute = ({ children }) => {
  const { user } = React.useContext(AppContext);

  return user ? <Navigate to="/" /> : children;
};

export default App;
