import React, { createContext, useState, useEffect } from "react";
import {
  fetchVisitedCountries,
  addCountry,
  removeCountry,
  fetchCountryCodeToNameMap,
} from "../utils/api.js";
import { fetchGeoData, findMatchingGeo } from "../utils/geo.js";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [content, setContent] = useState("");
  const [visitedCountries, setVisitedCountries] = useState([]);
  const [countryInput, setCountryInput] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
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

  useEffect(() => {
    if (countryInput.length > 0) {
      const filtered = Object.values(countryCodeToNameMap).filter((name) =>
        name.toLowerCase().startsWith(countryInput.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  }, [countryInput, countryCodeToNameMap]);

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

  const handleSidebarCountryClick = async (countryCode) => {
    const success = await removeCountry(countryCode);
    if (success) {
      setVisitedCountries((prevState) =>
        prevState.filter((code) => code !== countryCode)
      );
    }
  };

  const handleFormSubmit = async (event, countryInput) => {
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

  return (
    <AppContext.Provider
      value={{
        content,
        setContent,
        visitedCountries,
        countryInput,
        setCountryInput,
        filteredCountries,
        sidebarOpen,
        setSidebarOpen,
        highlightedCountry,
        handleCountryClick,
        handleSidebarCountryClick,
        handleFormSubmit,
        countryCodeToNameMap,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
