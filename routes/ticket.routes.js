const express = require("express");
const router = express.Router();

// CONTROLLER
const { createTicket } = require("../controllers/ticket.controller");

router.post("/", createTicket);

module.exports = router;
