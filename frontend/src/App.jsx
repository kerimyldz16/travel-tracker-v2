import React, { useState } from "react";
import "./styles.css";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Map from "./components/Map.jsx";
import useVisitedCountries from "./hooks/useVisitedCountries.js";
import highlightAnimation from "./hooks/highlightAnimation.js";

const App = () => {
  const [content, setContent] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    visitedCountries,
    countryCodeToNameMap,
    handleCountryClick,
    handleSidebarCountryClick,
  } = useVisitedCountries();

  const { highlightedCountry, handleFormSubmit } = highlightAnimation();

  return (
    <div className="App">
      <Header
        countryInput={countryInput}
        setCountryInput={setCountryInput}
        handleFormSubmit={(e) =>
          handleFormSubmit(e, countryInput, setCountryInput)
        }
        setSidebarOpen={setSidebarOpen}
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        visitedCountries={visitedCountries}
        countryCodeToNameMap={countryCodeToNameMap}
        handleSidebarCountryClick={handleSidebarCountryClick}
      />
      <Map
        content={content}
        setContent={setContent}
        visitedCountries={visitedCountries}
        highlightedCountry={highlightedCountry}
        handleCountryClick={handleCountryClick}
      />
    </div>
  );
};

export default App;
