const Ticket = require("../models/ticket.model");
const Flight = require("../models/flight.model");
const { checkAlphaNum } = require("../helpers/validators");

const createTicket = async (req, res) => {
	try {
		const {
			ticketId,
			flightDate,
			flightNumber,
			seatNumber,
			ticketCost,
		} = req.body.event;

		if (!ticketId || !flightDate || !flightNumber || !seatNumber || !ticketCost)
			return res.status(400).json({
				status: "failed",
				reason: "event input missing",
			});

		const isValidSeatNumber = checkAlphaNum(seatNumber);
		const isValidFlightNumber = checkAlphaNum(flightNumber);

		if (!isValidSeatNumber)
			return res.status(400).json({
				status: "failed",
				reason: "seatNumber is invalid format",
			});

		if (!isValidFlightNumber)
			return res.status(400).json({
				status: "failed",
				reason: "flightNumber is invalid format",
			});

		const newTicket = new Ticket({
			ticketId,
			ticketCost,
			seatNumber,
			flightNumber,
		});

		await newTicket.save();

		const flightExists = await Flight.getById(flightNumber);

		if (flightExists) {
			await Flight.update(flightNumber, {
				date: flightDate,
				ticket: newTicket,
			});
		} else {
			const newFlight = new Flight({
				ticket: newTicket,
				date: flightDate,
				flightNumber,
			});

			await newFlight.save();
		}

		return res.status(200).json({
			status: "success",
		});
	} catch (err) {
		console.log(err);

		return res.status(400).json({
			status: err.status,
			reason: err.reason,
		});
	}
};

module.exports = { createTicket };
