import express from "express";
import { addCountry, removeCountry, getVisitedCountries } from "../controllers";

const router = express.Router();

router.post("/add-country", addCountry);
router.delete("/remove-country", removeCountry);
router.get("/visited-countries", getVisitedCountries);

export default router;
