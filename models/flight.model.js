const { checkDate } = require("../helpers/validators");

let flights = [];

class Flight {
	constructor({ date, ticket, flightNumber }) {
		this.flightNumber = flightNumber;
		this.ticket = ticket;
		this.date = date;
	}

	static getById = (flightNumber) => {
		return new Promise((resolve, reject) => {
			const flightIndex = flights.findIndex(
				(flight) => flight.flightNumber === flightNumber
			);

			if (flightIndex === -1) resolve(null);

			const flight = flights[flightIndex];

			resolve({
				flight,
			});

			return;
		});
	};

	static getByDates = (startDate, endDate) => {
		return new Promise((resolve, reject) => {
			if (!startDate || !endDate) {
				reject({
					status: "failed",
					reason: "startDate is empty",
				});
				return;
			}

			if (!checkDate(startDate) || !checkDate(endDate)) {
				reject({
					status: "failed",
					reason: "startDate format is invalid",
				});
				return;
			}

			if (new Date(startDate) > new Date(endDate)) {
				reject({
					status: "failed",
					reason: "endDate cannot be before startDate",
				});
				return;
			}

			// save all the dates from startDate to endDate
			const datesArr = [];
			const dateMove = new Date(startDate);
			let strDate = startDate;

			if (startDate === endDate) datesArr.push(startDate);

			while (strDate < endDate) {
				strDate = dateMove.toISOString().slice(0, 10);
				datesArr.push(strDate);
				dateMove.setDate(dateMove.getDate() + 1);
			}

			let flightsQuery = [];

			for (let index = 0; index < datesArr.length; index++) {
				const date = datesArr[index];

				const allFlightsByDate = flights.filter(
					(flight) => flight.date === date
				);

				const flightByDate = {
					date,
					flights: [],
				};

				if (allFlightsByDate.length === 0) {
					flightsQuery.push(flightByDate);
				} else {
					for (let j = 0; j < allFlightsByDate.length; j++) {
						const { flightNumber, revenue, occupiedSeats } = allFlightsByDate[
							j
						];

						flightByDate.flights.push({
							flightNumber,
							revenue,
							occupiedSeats,
						});
					}

					flightsQuery.push(flightByDate);
				}
			}

			resolve(flightsQuery);

			return;
		});
	};

	save = () => {
		return new Promise((resolve, reject) => {
			const newFlight = {
				flightNumber: this.flightNumber,
				date: this.date,
				revenue: this.ticket.ticketCost,
				occupiedSeats: [this.ticket.seatNumber],
			};

			flights.push(newFlight);

			resolve({
				newFlight,
				status: "success",
			});

			return;
		});
	};

	static update = (flightNumber, { date, ticket }) => {
		return new Promise((resolve, reject) => {
			const flightIndex = flights.findIndex(
				(flight) => flight.flightNumber === flightNumber
			);

			const flight = flights[flightIndex];

			const occupiedSeats = flight.occupiedSeats;

			occupiedSeats.push(ticket.seatNumber);

			const arrangeOccupiedSeats = occupiedSeats.sort((a, b) => {
				return a.localeCompare(b, undefined, {
					numeric: true,
					sensitivity: "base",
				});
			});

			flight.date = date;
			flight.revenue = flight.revenue + ticket.ticketCost;
			flight.occupiedSeats = arrangeOccupiedSeats;

			resolve({
				flights,
				status: "success",
			});

			return;
		});
	};
}

module.exports = Flight;
