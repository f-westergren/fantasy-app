const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const comparePass = (userPassword, databasePassword) => {
	return bcrypt.compareSync(userPassword, databasePassword);
};

const createToken = (user) => {
	let payload = { username: user };
	return jwt.sign(payload, process.env.SECRET);
};

module.exports = { comparePass, createToken };
