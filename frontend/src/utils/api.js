import axios from "axios";

export const fetchVisitedCountries = async () => {
  try {
    const response = await axios.get("http://localhost:5000/visited-countries");
    return response.data.map((country) => country.country_code);
  } catch (error) {
    console.error("Error fetching visited countries:", error);
    return [];
  }
};

export const fetchCountryCodeToNameMap = async () => {
  try {
    const response = await fetch("/features.json");
    const data = await response.json();
    const mapping = {};
    if (data.objects && data.objects.world && data.objects.world.geometries) {
      data.objects.world.geometries.forEach((geo) => {
        mapping[geo.id] = geo.properties.name;
      });
    }
    return mapping;
  } catch (error) {
    console.error("Error fetching country code to name map:", error);
    return {};
  }
};

export const addCountry = async (countryCode) => {
  try {
    const response = await axios.post("http://localhost:5000/add-country", {
      country_code: countryCode,
    });
    console.log(`Country ${countryCode} added:`, response.data); //Debugging
    return true;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.error("Country already visited:", error.response.data);
    } else {
      console.error("Error updating country:", error);
    }
    return false;
  }
};

export const removeCountry = async (countryCode) => {
  try {
    const response = await axios.delete(
      "http://localhost:5000/remove-country",
      {
        data: { country_code: countryCode },
      }
    );
    console.log(`Country ${countryCode} removed:`, response.data); //Debugging
    return true;
  } catch (error) {
    console.error("Error removing country:", error);
    return false;
  }
};
