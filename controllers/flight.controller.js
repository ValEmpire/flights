const Flight = require("../models/flight.model");

const getFlights = async (req, res) => {
	try {
		const { startDate, endDate } = req.query;

		const flights = await Flight.getByDates(startDate, endDate);

		return res.status(200).json({
			dates: flights,
		});
	} catch (err) {
		console.log(err);

		return res.status(400).json({
			status: err.status,
			reason: err.reason,
		});
	}
};

module.exports = { getFlights };
