const ShortUrl = require('../models/shortUrl');
const { findUniqueShortId, generateShortId } = require('../utils/generateShortUrl');

class urlController {
	async getAllUrls(req, res) {
		res.sendStatus(400);
	}
	async shorten(req, res) {
		const { fullUrl, customShortId } = req.body;

		try {
			const shortId = await findUniqueShortId(customShortId || generateShortId());
			console.log(shortId);

			const url = new ShortUrl({
				full: fullUrl,
				short: shortId,
				expiresAt: new Date(Date.now() + 60 * 60 * 1000), // Пример времени истечения
			});

			await url.save();
			res.send(url);
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	}
	async redirect(req, res) {
		const { shortId } = req.params;
		const url = await ShortUrl.findOne({ short: shortId });

		if (url) {
			let fullUrl = url.full;
			if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
				fullUrl = 'http://' + fullUrl;
			}
			res.redirect(fullUrl);
		} else {
			res.sendStatus(404);
		}
	}
}

module.exports = new urlController();
