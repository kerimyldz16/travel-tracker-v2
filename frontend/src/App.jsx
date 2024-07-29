import React, { useState } from "react";
import "./styles.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import useVisitedCountries from "./hooks/useVisitedCountries";
import useGeoData from "./hooks/useGeoData";

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

  const { highlightedCountry, handleFormSubmit } = useGeoData();

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
