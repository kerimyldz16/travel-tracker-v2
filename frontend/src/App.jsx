import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AppProvider, AppContext } from "./context/AppContext.js";
import Main from "./layouts/Main.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

const App = () => {
  return (
    <Router>
      <AppProvider>
        <Routes>
          {/* Only authenticated users can access Main */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />
          {/* Login and Register are open to unauthenticated users */}
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

// Restrict access to Main if not authenticated
const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AppContext);

  return user ? children : <Navigate to="/login" />;
};

// Allow only unauthenticated users to access login/register
const PublicRoute = ({ children }) => {
  const { user } = React.useContext(AppContext);

  return user ? <Navigate to="/" /> : children;
};

export default App;
