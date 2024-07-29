import React, { useContext } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { AppContext } from "../context/AppContext";

const Map = () => {
  const {
    content,
    setContent,
    visitedCountries,
    highlightedCountry,
    handleCountryClick,
  } = useContext(AppContext);

  return (
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
              const isHighlighted = highlightedCountry === countryCode;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setContent(countryName)}
                  onMouseLeave={() => setContent("")}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={countryName}
                  onClick={() => handleCountryClick(countryCode)}
                  className={isHighlighted ? "blink" : ""}
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
      <Tooltip id="my-tooltip">{content}</Tooltip>
    </div>
  );
};

export default Map;
