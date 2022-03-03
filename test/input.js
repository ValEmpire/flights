const testInputs = [
	{
		test: "create ticket with invalid seatNumber",
		event: {
			ticketId: 1,
			flightDate: "2021-11-01",
			seatNumber: "AA",
			flightNumber: "AC1",
			ticketCost: 100000,
		},
		expect: 400,
		status: "failed",
		reason: "seatNumber is invalid format",
	},
	{
		test: "create ticket with invalid flightNumber",
		event: {
			ticketId: 1,
			flightDate: "2021-11-01",
			seatNumber: "A1",
			flightNumber: "1",
			ticketCost: 100000,
		},
		expect: 400,
		status: "failed",
		reason: "flightNumber is invalid format",
	},
	{
		test: "create ticket with missing event input",
		event: {
			ticketId: 1,
			flightDate: "2021-11-01",
			seatNumber: "1A",
			ticketCost: 100000,
		},
		expect: 400,
		status: "failed",
		reason: "event input missing",
	},
	{
		test: "create ticket with valid input",
		event: {
			ticketId: 1,
			flightDate: "2021-11-01",
			flightNumber: "AC1",
			seatNumber: "1A",
			ticketCost: 100000,
		},
		expect: 200,
		status: "success",
	},
	{
		test: "create ticket with the same ticketId",
		event: {
			ticketId: 1,
			flightDate: "2021-11-01",
			flightNumber: "AC1",
			seatNumber: "3A",
			ticketCost: 100000,
		},
		expect: 400,
		status: "failed",
		reason: "tickedId already exists",
	},
	{
		test: "create ticket with the same flightNumber and same seatNumber",
		event: {
			ticketId: 2,
			flightDate: "2021-11-01",
			flightNumber: "AC1",
			seatNumber: "1A",
			ticketCost: 100000,
		},
		expect: 400,
		status: "failed",
		reason: "seatNumber already taken",
	},
	{
		test:
			"create ticket with same flightNumber, different ticketId and different seatNumber",
		event: {
			ticketId: 2,
			flightDate: "2021-11-01",
			flightNumber: "AC1",
			seatNumber: "10A",
			ticketCost: 100000,
		},
		expect: 200,
		status: "success",
	},
	{
		test:
			"create ticket with the same flightNumber with different ticketId, different seatNumber, different date",
		event: {
			ticketId: 3,
			flightDate: "2021-11-03",
			flightNumber: "AC1",
			seatNumber: "15A",
			ticketCost: 50000,
		},
		expect: 200,
		status: "success",
	},
	{
		test: "create ticket with different flightNumber",
		event: {
			ticketId: 4,
			flightDate: "2021-11-03",
			flightNumber: "AC2",
			seatNumber: "5A",
			ticketCost: 200000,
		},
		expect: 200,
		status: "success",
	},
];

module.exports = {
	testInputs,
};
