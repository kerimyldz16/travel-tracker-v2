import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const {
    sidebarOpen,
    visitedCountries,
    countryCodeToNameMap,
    handleSidebarCountryClick,
    setSidebarOpen,
  } = useContext(AppContext);

  const handleBackdropClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {sidebarOpen && (
        <div className="backdrop" onClick={handleBackdropClick}></div>
      )}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Visited Countries</h2>
        <hr />
        {visitedCountries.map((countryCode, index) => (
          <div key={index} className="country-item">
            <p className="country-item-p">
              {countryCodeToNameMap[countryCode] || countryCode}
            </p>
            <FaTimes
              className="delete-btn"
              onClick={() => handleSidebarCountryClick(countryCode)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
