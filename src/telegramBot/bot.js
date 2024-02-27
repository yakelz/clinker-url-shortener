const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const axios = require('./utils/axios');
const responses = require('./data/responses');

const checkMembership = async (msg) => {
	const chatId = process.env.TG_PUBLIC_ID;
	const userId = msg.from.id;

	try {
		const member = await bot.getChatMember(chatId, userId);
		console.log(member);
		if (member.status === 'left') {
			return false;
		}
		return true;
	} catch (e) {
		console.error(e);
	}
};

bot.on('message', async (msg) => {
	if (await checkMembership(msg)) {
		console.log(msg);
		handleCommand(msg);
	} else {
		const opts = {
			reply_to_message_id: msg.message_id,
			reply_markup: JSON.stringify({
				keyboard: [['Yes, you are the bot of my life ❤'], ['No, sorry there is another one...']],
			}),
		};
		bot.sendMessage(msg.chat.id, 'Do you love me?', opts);
	}
});

function handleCommand(msg) {
	const command = msg?.text?.split(' ')[0];

	switch (command) {
		case '/start':
			console.log(responses);
			bot.sendMessage(msg.chat.id, responses.start);
			break;

		case '/ping':
			bot.sendMessage(msg.chat.id, 'Pong');
			break;

		case '/shorten':
			const url = msg.text.split(' ')[1];
			if (!url || msg.entities[1]?.type !== 'url') {
				bot.sendMessage(msg.chat.id, 'Пожалуйста, укажи URL для сокращения');
				return;
			}

			const customShortId = msg.text.split(' ')[2];
			shortenUrl(msg.chat.id, url, customShortId);

			break;

		default:
			bot.sendMessage(msg.chat.id, 'Неизвестная команда.');
	}
}

async function shortenUrl(chatId, url, customShortId = null) {
	try {
		const link = await axios.post('/shorten', {
			fullUrl: url,
			customShortId: customShortId,
			userId: chatId,
		});
		bot.sendMessage(chatId, `Твоя сокращенная ссылка: ${link.data.shortUrl}`);
	} catch (e) {
		bot.sendMessage(chatId, `Ошибка: ${e.response.data.error}`);
		console.log(e);
	}
}

module.exports = bot;
