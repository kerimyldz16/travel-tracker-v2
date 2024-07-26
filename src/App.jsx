import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import "./styles.css";
import { Tooltip } from "react-tooltip";

const App = () => {
  const [content, setContent] = useState("");

  return (
    <div className="App">
      <h1>Welcome to World Map!</h1>
      <Tooltip id="my-tooltip">{content}</Tooltip>
      <div className="map">
        <ComposableMap
          projectionConfig={{ scale: 200 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup center={[0, 5]} zoom={1.2}>
            <Geographies geography="/features.json">
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name;
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
                      onClick={() => console.log(`You clicked ${countryName}!`)}
                      style={{
                        default: {
                          outline: "none",
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
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
};

export default App;
