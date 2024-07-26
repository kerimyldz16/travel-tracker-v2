import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import {
  fetchVisitedCountries,
  fetchCountryCodeToNameMap,
  addCountry,
  removeCountry,
} from "./utils/api";
import { fetchGeoData, findMatchingGeo } from "./utils/geo";

const App = () => {
  const [content, setContent] = useState("");
  const [visitedCountries, setVisitedCountries] = useState([]);
  const [countryInput, setCountryInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [highlightedCountry, setHighlightedCountry] = useState("");
  const [countryCodeToNameMap, setCountryCodeToNameMap] = useState({});

  useEffect(() => {
    const initializeData = async () => {
      const countries = await fetchVisitedCountries();
      const countryNameMap = await fetchCountryCodeToNameMap();
      setVisitedCountries(countries);
      setCountryCodeToNameMap(countryNameMap);
    };

    initializeData();
  }, []);

  const handleCountryClick = async (countryCode) => {
    if (visitedCountries.includes(countryCode)) {
      const success = await removeCountry(countryCode);
      if (success) {
        setVisitedCountries((prevState) =>
          prevState.filter((code) => code !== countryCode)
        );
      }
    } else {
      const success = await addCountry(countryCode);
      if (success) {
        setVisitedCountries((prevState) => [...prevState, countryCode]);
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = await fetchGeoData();
    if (data) {
      const matchingGeo = findMatchingGeo(data, countryInput);
      if (matchingGeo) {
        setHighlightedCountry(matchingGeo.id);
        setTimeout(() => {
          setHighlightedCountry("");
        }, 2000);
      } else {
        console.error("Country not found");
      }
    }

    setCountryInput("");
  };

  const handleSidebarCountryClick = async (countryCode) => {
    const success = await removeCountry(countryCode);
    if (success) {
      setVisitedCountries((prevState) =>
        prevState.filter((code) => code !== countryCode)
      );
    }
  };

  return (
    <div className="App">
      <Header
        countryInput={countryInput}
        setCountryInput={setCountryInput}
        handleFormSubmit={handleFormSubmit}
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
