const createServer = require("../server");
const supertest = require("supertest");

const app = createServer();
const { queries } = require("../test/query");

queries.forEach((query) => {
	test(query.test, async () => {
		let endPoint = "";

		if (!query.queries.startDate) {
			endPoint = `/api/flights?endDate=${query.queries.endDate}`;
		} else {
			endPoint = `/api/flights?startDate=${query.queries.startDate}&endDate=${query.queries.endDate}`;
		}

		await supertest(app)
			.get(endPoint)
			.expect(query.expect)
			.then((res) => {
				expect(res.body.status).toBe(query.status);
				expect(res.body.reason).toBe(query.reason);
			});
	});
});
