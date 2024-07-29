import { useState, useEffect } from "react";
import { fetchVisitedCountries, addCountry, removeCountry } from "../utils/api";

const useVisitedCountries = () => {
  const [visitedCountries, setVisitedCountries] = useState([]);
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

  const handleSidebarCountryClick = async (countryCode) => {
    const success = await removeCountry(countryCode);
    if (success) {
      setVisitedCountries((prevState) =>
        prevState.filter((code) => code !== countryCode)
      );
    }
  };

  return {
    visitedCountries,
    countryCodeToNameMap,
    handleCountryClick,
    handleSidebarCountryClick,
  };
};

export default useVisitedCountries;
