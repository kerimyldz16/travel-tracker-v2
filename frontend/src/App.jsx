import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import axios from "axios";
import "./styles.css";
import { Tooltip } from "react-tooltip";
import { FaSearch } from "react-icons/fa";

const App = () => {
  const [content, setContent] = useState("");
  const [visitedCountries, setVisitedCountries] = useState([]);
  const [countryInput, setCountryInput] = useState("");

  useEffect(() => {
    const fetchVisitedCountries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/visited-countries"
        );
        const countryCodes = response.data.map(
          (country) => country.country_code
        );
        setVisitedCountries(countryCodes);
      } catch (error) {
        console.error("Error fetching visited countries:", error);
      }
    };

    fetchVisitedCountries();
  }, []);

  const handleCountryClick = async (countryCode) => {
    try {
      if (visitedCountries.includes(countryCode)) {
        const response = await axios.delete(
          "http://localhost:5000/remove-country",
          { data: { country_code: countryCode } }
        );
        console.log(`Country ${countryCode} removed:`, response.data);
        setVisitedCountries((prevState) =>
          prevState.filter((code) => code !== countryCode)
        );
      } else {
        const response = await axios.post("http://localhost:5000/add-country", {
          country_code: countryCode,
        });
        console.log(`Country ${countryCode} added:`, response.data);
        setVisitedCountries((prevState) => [...prevState, countryCode]);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error("Country already visited:", error.response.data);
      } else {
        console.error("Error updating country:", error);
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/features.json");
      const data = await response.json();
      console.log("Fetched data:", data);

      if (data.objects && data.objects.world && data.objects.world.geometries) {
        const matchingGeo = data.objects.world.geometries.find(
          (geo) =>
            geo.properties.name.toLowerCase() === countryInput.toLowerCase()
        );

        if (matchingGeo) {
          handleCountryClick(matchingGeo.id);
        } else {
          console.error("Country not found");
        }
      } else {
        console.error("Invalid data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching geo data:", error);
    }

    setCountryInput("");
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Travel Tracker</h1>
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
          <button type="submit">Add</button>
        </form>
      </div>
      <Tooltip id="my-tooltip">{content}</Tooltip>
      <div className="map">
        <ComposableMap
          projectionConfig={{ scale: 230 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const countryCode = geo.id;
                const isVisited = visitedCountries.includes(countryCode);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setContent(countryName);
                    }}
                    onMouseLeave={() => {
                      setContent("");
                    }}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={countryName}
                    onClick={() => handleCountryClick(countryCode)}
                    style={{
                      default: {
                        fill: isVisited ? "teal" : "#525966",
                        outline: "none",
                        stroke: "#21252b",
                      },
                      pressed: {
                        outline: "none",
                      },
                      hover: {
                        cursor: "pointer",
                        fill: "teal",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
};

export default App;
