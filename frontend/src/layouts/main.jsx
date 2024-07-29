import React from "react";
import "../styles.css";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Map from "../components/Map.jsx";
import { AppProvider } from "../context/AppContext.js";

const Main = () => {
  return (
    <AppProvider>
      <div className="App">
        <Header />
        <Sidebar />
        <Map />
      </div>
    </AppProvider>
  );
};

export default Main;
