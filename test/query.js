const queries = [
	{
		test: "get flights with startDate or endDate missing",
		queries: {
			endDate: "2021-11-01",
		},
		expect: 400,
		status: "failed",
		reason: "startDate is empty",
	},
	{
		test: "get flights with not properly formatted startDate or endDate",
		queries: {
			startDate: "11-01-2021",
			endDate: "11-01-2021",
		},
		expect: 400,
		status: "failed",
		reason: "startDate format is invalid",
	},
	{
		test: "get flights with endDate before the startDate",
		queries: {
			startDate: "2021-11-04",
			endDate: "2021-11-01",
		},
		expect: 400,
		status: "failed",
		reason: "endDate cannot be before startDate",
	},
	{
		test: "get flights with valid startDate and endDate",
		queries: {
			startDate: "2021-11-01",
			endDate: "2021-11-04",
		},
		expect: 200,
	},
];

module.exports = {
	queries,
};
