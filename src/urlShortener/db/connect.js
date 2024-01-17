const Sequelize = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: 'mysql',
	port: process.env.DB_PORT,
	logging: console.log,
});

db.authenticate()
	.then(() => console.log('Подключение БД успешно'))
	.catch((err) => console.error('Ошибка подключения к БД:', err));

module.exports = db;
