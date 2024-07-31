import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const addCountry = async (req, res) => {
  const { country_code } = req.body;
  try {
    const { data, error } = await supabase
      .from("visited_countries")
      .select("*")
      .eq("country_code", country_code);

    if (data.length > 0) {
      res.status(409).json({ error: "Country already visited" });
    } else {
      const { data: insertData, error: insertError } = await supabase
        .from("visited_countries")
        .insert([{ country_code }])
        .single();

      if (insertError) throw insertError;

      res.json(insertData);
    }
  } catch (err) {
    console.error(`Error adding country code: ${country_code}`, err);
    res.status(500).json({ error: "Database error" });
  }
};

export const removeCountry = async (req, res) => {
  const { country_code } = req.body;
  try {
    const { data, error } = await supabase
      .from("visited_countries")
      .delete()
      .eq("country_code", country_code)
      .single();

    if (error) {
      res.status(404).json({ error: "Country not found" });
    } else {
      res.json(data);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const getVisitedCountries = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("visited_countries")
      .select("country_code");

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};
