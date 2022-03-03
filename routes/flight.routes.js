const express = require("express");
const router = express.Router();

// CONTROLLER
const { getFlights } = require("../controllers/flight.controller");

router.get("/", getFlights);

module.exports = router;
