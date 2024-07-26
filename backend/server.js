import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "travel_tracker",
  password: "kerim123",
  port: 5432,
});

app.post("/add-country", async (req, res) => {
  const { country_code } = req.body;
  try {
    console.log(`Checking if country code exists: ${country_code}`); // Debugging log
    const checkResult = await pool.query(
      "SELECT * FROM visited_countries WHERE country_code = $1",
      [country_code]
    );

    if (checkResult.rows.length > 0) {
      res.status(409).json({ error: "Country already visited" });
    } else {
      console.log(`Adding country code: ${country_code}`); // Debugging log
      const insertResult = await pool.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1) RETURNING *",
        [country_code]
      );
      res.json(insertResult.rows[0]);
    }
  } catch (err) {
    console.error(`Error adding country code: ${country_code}`, err);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/remove-country", async (req, res) => {
  const { country_code } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM visited_countries WHERE country_code = $1 RETURNING *",
      [country_code]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Country not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/visited-countries", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT country_code FROM visited_countries"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
