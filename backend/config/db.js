import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "travel_tracker",
  password: "kerim123",
  port: 5432,
});

export default pool;
