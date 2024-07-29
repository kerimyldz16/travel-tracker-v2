import { useState } from "react";
import { fetchGeoData, findMatchingGeo } from "../utils/geo.js";

const highlightAnimation = () => {
  const [highlightedCountry, setHighlightedCountry] = useState("");

  const handleFormSubmit = async (event, countryInput, setCountryInput) => {
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

  return {
    highlightedCountry,
    handleFormSubmit,
  };
};

export default highlightAnimation;
