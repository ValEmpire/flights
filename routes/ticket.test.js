const createServer = require("../server");
const supertest = require("supertest");

const app = createServer();
const { testInputs } = require("../test/input");

testInputs.forEach((testInput) => {
	test(testInput.test, async () => {
		await supertest(app)
			.post("/api/tickets")
			.send({ event: testInput.event })
			.set("Accept", "application/json")
			.expect(testInput.expect)
			.then((res) => {
				expect(res.body.status).toBe(testInput.status);
				expect(res.body.reason).toBe(testInput.reason);
			});
	});
});
