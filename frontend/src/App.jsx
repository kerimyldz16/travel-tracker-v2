import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext.js";
import Main from "./layouts/Main.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
