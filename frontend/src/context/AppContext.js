import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebaseConfig.js";
import { useNavigate } from "react-router-dom";
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
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchVisitedCountries(user.uid).then((countries) => {
          setVisitedCountries(countries);
        });
        navigate("/"); // login başarılıysa main'e yönlendir
      } else {
        setUser(null);
        setVisitedCountries([]);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const initializeData = async () => {
      const countryNameMap = await fetchCountryCodeToNameMap();
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
    if (!user) return;

    if (visitedCountries.includes(countryCode)) {
      const success = await removeCountry(countryCode, user.uid);
      if (success) {
        setVisitedCountries((prevState) =>
          prevState.filter((code) => code !== countryCode)
        );
      }
    } else {
      const success = await addCountry(countryCode, user.uid);
      if (success) {
        setVisitedCountries((prevState) => [...prevState, countryCode]);
      }
    }
  };

  const handleSidebarCountryClick = async (countryCode) => {
    if (!user) return;

    const success = await removeCountry(countryCode, user.uid);
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
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
