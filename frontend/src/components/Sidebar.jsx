import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Sidebar = () => {
  const {
    sidebarOpen,
    visitedCountries,
    countryCodeToNameMap,
    handleSidebarCountryClick,
  } = useContext(AppContext);

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <h2>Visited Countries</h2>
      {visitedCountries.map((countryCode, index) => (
        <p
          key={index}
          onClick={() => handleSidebarCountryClick(countryCode)}
          style={{ cursor: "pointer" }}
        >
          {countryCodeToNameMap[countryCode] || countryCode}
        </p>
      ))}
    </div>
  );
};

export default Sidebar;
