import React, { useContext } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { AppContext } from "../context/appContext.js";

const Header = () => {
  const {
    countryInput,
    setCountryInput,
    handleFormSubmit,
    setSidebarOpen,
    sidebarOpen,
    filteredCountries,
  } = useContext(AppContext);

  return (
    <div className="header">
      <div className="Logo">
        <h1>Travel Tracker</h1>
      </div>
      <div className="rightMenu">
        <form
          onSubmit={(e) => handleFormSubmit(e, countryInput)}
          style={{ position: "relative" }}
        >
          <input
            type="text"
            name="country"
            value={countryInput}
            onChange={(e) => setCountryInput(e.target.value)}
            autoFocus
            autoComplete="off"
            placeholder="Enter country name"
          />
          <FaSearch className="fa-search" />
          {filteredCountries.length > 0 && (
            <ul className="suggestions">
              {filteredCountries.map((countryName, index) => (
                <li
                  key={index}
                  onClick={(e) => {
                    setCountryInput(countryName);
                    handleFormSubmit(e, countryName);
                  }}
                >
                  {countryName}
                </li>
              ))}
            </ul>
          )}
        </form>
        <FaBars
          className="fa-bars"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
    </div>
  );
};

export default Header;
