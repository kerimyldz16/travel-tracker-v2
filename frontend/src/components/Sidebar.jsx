import React from "react";

const Sidebar = ({
  sidebarOpen,
  visitedCountries,
  countryCodeToNameMap,
  handleSidebarCountryClick,
}) =>
  sidebarOpen && (
    <div className="sidebar">
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

export default Sidebar;
