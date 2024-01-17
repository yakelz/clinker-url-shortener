require('dotenv').config();
const bot = require('./telegramBot/bot');
const app = require('./urlShortener/server');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
