import React, { useContext } from "react";
import { AppContext } from "../context/appContext.js";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebaseConfig.js";

const Sidebar = () => {
  const {
    sidebarOpen,
    visitedCountries,
    countryCodeToNameMap,
    handleSidebarCountryClick,
    setSidebarOpen,
    user,
    setUser,
  } = useContext(AppContext);

  const handleBackdropClick = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
  };

  return (
    <>
      {sidebarOpen && (
        <div className="backdrop" onClick={handleBackdropClick}></div>
      )}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-wrapper">
          <h2>Visited Countries</h2>
          <hr />
          <div className="visited-countries">
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
          <hr />
          <div className="logout-wrapper">
            {user ? (
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <div>
                <Link to="/login">Login</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
