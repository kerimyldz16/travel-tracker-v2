import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import countryRoutes from "./routes/countryRoutes.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/apiv1", countryRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
