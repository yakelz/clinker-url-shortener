const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
	full: {
		type: String,
		required: true,
	},
	short: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	expiresAt: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
