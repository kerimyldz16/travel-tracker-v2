import React from "react";
import "../styles.css";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Map from "../components/Map.jsx";
const Main = () => {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Map />
    </div>
  );
};

export default Main;
