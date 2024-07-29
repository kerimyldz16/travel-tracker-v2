import React, { useContext } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const {
    countryInput,
    setCountryInput,
    handleFormSubmit,
    setSidebarOpen,
    sidebarOpen,
  } = useContext(AppContext);

  return (
    <div className="header">
      <div className="Logo">
        <h1>Travel Tracker</h1>
      </div>
      <div className="rightMenu">
        <form onSubmit={handleFormSubmit}>
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
          <button type="submit">Find Country</button>
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
