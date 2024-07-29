export const fetchGeoData = async () => {
  try {
    const response = await fetch("/features.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching geo data:", error);
    return null;
  }
};

export const findMatchingGeo = (data, countryName) => {
  if (data.objects.world.geometries) {
    return data.objects.world.geometries.find(
      (geo) => geo.properties.name.toLowerCase() === countryName.toLowerCase()
    );
  }
  console.error("Invalid data structure:", data);
  return null;
};
