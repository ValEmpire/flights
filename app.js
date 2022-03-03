const createServer = require("./server");

const app = createServer();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}`);
});
