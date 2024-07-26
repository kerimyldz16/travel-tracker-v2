import React from "react";
import { FaSearch, FaBars } from "react-icons/fa";

const Header = ({
  countryInput,
  setCountryInput,
  handleFormSubmit,
  setSidebarOpen,
}) => (
  <div className="header">
    <h1>Travel Tracker</h1>
    <FaBars
      className="fa-bars"
      onClick={() => setSidebarOpen((prev) => !prev)}
    />
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
      <button type="submit">Change Color</button>
    </form>
  </div>
);

export default Header;
