// express
const express = require("express");

// LOGGER
const morgan = require("morgan");

function createServer() {
	const app = express();

	// Middlewares
	app.use(express.json({ extended: false })); // for parsing application/json
	app.use(morgan("dev")); // logger

	//REST API USER ROUTES
	app.use("/api/tickets", require("./routes/ticket.routes"));
	app.use("/api/flights", require("./routes/flight.routes"));

	return app;
}

module.exports = createServer;
