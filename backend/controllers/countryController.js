import pool from "../config/db.js";

export const addCountry = async (req, res) => {
  const { country_code } = req.body;
  try {
    console.log(`Checking if country code exists: ${country_code}`); //Debugging
    const checkResult = await pool.query(
      "SELECT * FROM visited_countries WHERE country_code = $1",
      [country_code]
    );

    if (checkResult.rows.length > 0) {
    } else {
      console.log(`Adding country code: ${country_code}`); //Debugging
      const insertResult = await pool.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1) RETURNING *",
        [country_code]
      );
      res.json(insertResult.rows[0]);
    }
  } catch (err) {
    console.error(`Error adding country code: ${country_code}`, err);
  }
};

export const removeCountry = async (req, res) => {
  const { country_code } = req.body;
  try {
    const removeResult = await pool.query(
      "DELETE FROM visited_countries WHERE country_code = $1 RETURNING *",
      [country_code]
    );
    if (removeResult.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
    }
  } catch (err) {
    console.error(err);
  }
};

export const getVisitedCountries = async (req, res) => {
  try {
    const getResult = await pool.query(
      "SELECT country_code FROM visited_countries"
    );
    res.json(getResult.rows);
  } catch (err) {
    console.error(err);
  }
};
