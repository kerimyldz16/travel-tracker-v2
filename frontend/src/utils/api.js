import { supabase } from "./supabaseClient.js";

export const fetchVisitedCountries = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("visited_countries")
      .select("country_code")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching visited countries:", error);
      return [];
    }
    return data.map((country) => country.country_code);
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
    if (data.objects.world.geometries) {
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

export const addCountry = async (countryCode, userId) => {
  try {
    const { data, error } = await supabase
      .from("visited_countries")
      .insert([{ country_code: countryCode, user_id: userId }]);

    if (error) {
      if (error.status === 409) {
        console.error("Country already visited:", error.message);
      } else {
        console.error("Error adding country:", error);
      }
      return false;
    }
    console.log(`Country ${countryCode} added:`, data);
    return true;
  } catch (error) {
    console.error("Error adding country:", error);
    return false;
  }
};

export const removeCountry = async (countryCode, userId) => {
  try {
    const { data, error } = await supabase
      .from("visited_countries")
      .delete()
      .eq("country_code", countryCode)
      .eq("user_id", userId);

    if (error) {
      console.error("Error removing country:", error);
      return false;
    }
    console.log(`Country ${countryCode} removed:`, data);
    return true;
  } catch (error) {
    console.error("Error removing country:", error);
    return false;
  }
};
