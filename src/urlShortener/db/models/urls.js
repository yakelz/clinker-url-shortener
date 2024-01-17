const Sequelize = require('sequelize');
const db = require('../connect');

const Url = db.define('url', {
	fullUrl: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	shortUrl: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	userId: {
		type: Sequelize.INTEGER,
	},
	expireAt: {
		type: Sequelize.DATE,
	},
});

db.sync().catch((err) => console.log(err));

module.exports = Url;
