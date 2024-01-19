const Urls = require('../db/models/urls');

const findUniqueShortId = async (customShortId) => {
    let uniqueShortId = customShortId || generateShortId();

    while (true) {
        const existingUrl = await Urls.findOne({ where: { shortUrl: uniqueShortId } });
        if (!existingUrl) {
            return uniqueShortId; 
        }
        if (customShortId) {
            throw new Error('Этот сокращенный URL уже занят.');
        }
        uniqueShortId = generateShortId();
    }
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
