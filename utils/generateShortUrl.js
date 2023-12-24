const ShortUrl = require('../models/shortUrl');

const findUniqueShortId = async (customShortId) => {
	let uniqueShortId = customShortId;
	let isUnique = false;

	while (!isUnique) {
		const existingUrl = await ShortUrl.findOne({ short: uniqueShortId });
		if (!existingUrl) {
			return uniqueShortId;
		}
		if (customShortId) {
			throw new Error('Этот сокращенный URL уже занят.');
		}
		// Генерируем новый ID, если пользовательский ID не был предоставлен
		uniqueShortId = generateShortId();
	}

	return uniqueShortId;
};

const generateShortId = () => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < 3; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

module.exports = { findUniqueShortId, generateShortId };
