const checkAlphaNum = (string) => {
	const alphaNum = new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$");

	const isAlphaNum = alphaNum.test(string);

	if (!isAlphaNum) return false;

	return true;
};

const checkDate = (date) => {
	var dateRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;

	const isDateInProperFormat = dateRegex.test(date);

	if (!isDateInProperFormat) return false;

	return true;
};

module.exports = {
	checkAlphaNum,
	checkDate,
};
