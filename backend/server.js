import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import countryRoutes from "./routes/country.routes.js";

const app = express();
const port = 5000;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://travel-tracker-frontend.vercel.app",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/api/v1", countryRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
