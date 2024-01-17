const Urls = require('../db/models/urls');
const { findUniqueShortId, generateShortId } = require('../utils/generateShortURL');

class urlController {
	async getUserUrls(req, res) {
		const { userId } = req.params;
		try {
			const urls = await Urls.findAll({ where: { userId: userId } });
			res.json(urls);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	async shorten(req, res) {
		const { fullUrl, customShortId, userId } = req.body;
		try {
			const shortId = await findUniqueShortId(customShortId || generateShortId());
			const newUrl = await Urls.create({ fullUrl: fullUrl, shortUrl: shortId, userId: userId });
			res.json(newUrl);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	async redirect(req, res) {
		const { shortId } = req.params;
		try {
			const url = await Urls.findOne({ where: { shortUrl: shortId } });
			if (url) {
				res.redirect(url.fullUrl);
			} else {
				res.status(404).send('URL не найден');
			}
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = new urlController();
