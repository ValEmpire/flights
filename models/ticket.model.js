let tickets = [];

class Ticket {
	constructor({ ticketId, seatNumber, ticketCost, flightNumber }) {
		this.ticketId = ticketId;
		this.seatNumber = seatNumber;
		this.ticketCost = ticketCost;
		this.flightNumber = flightNumber;
	}

	save = () => {
		return new Promise((resolve, reject) => {
			const { ticketId, seatNumber, ticketCost } = this;

			// check if ticketId exists
			const ticketIdExists = tickets.find(
				(ticket) => ticket.ticketId === ticketId
			);

			// if exists
			if (ticketIdExists) {
				reject({
					status: "failed",
					reason: "tickedId already exists",
				});

				return;
			}

			// check if seat is taken in the sameFlight
			const sameFlightAndSameSeatNumber = tickets.find(
				(ticket) =>
					ticket.flightNumber === this.flightNumber &&
					ticket.seatNumber === this.seatNumber
			);

			// same flight and same seat number
			if (sameFlightAndSameSeatNumber) {
				reject({
					status: "failed",
					reason: "seatNumber already taken",
				});

				return;
			} else {
				const newTicket = {
					ticketId,
					seatNumber,
					ticketCost,
					flightNumber: this.flightNumber,
				};

				tickets.push(newTicket);

				resolve({
					newTicket,
					status: "success",
				});

				return;
			}
		});
	};
}

module.exports = Ticket;
