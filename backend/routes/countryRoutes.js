import express from "express";
import countryController from "../controllers/index.js";

const router = express.Router();

router.post("/add-country", countryController.addCountry);
router.delete("/remove-country", countryController.removeCountry);
router.get("/visited-countries", countryController.getVisitedCountries);

export default router;
