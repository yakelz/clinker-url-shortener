const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const axios = require('./utils/axios');

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
  }
  catch (e) {console.error(e);}
};

bot.on('message', async (msg) => {
	if (await checkMembership(msg)) {
    console.log(msg);
		const chatId = msg.chat.id;
		bot.sendMessage(chatId, 'Received your message');
	}
	 else {
    // Пользователь не является участником группы
    bot.sendMessage(msg.chat.id, 'Вы не являетесь участником группы.');
  }
});

bot.onText(/\/shorten (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const url = match[1]; 

    axios.post('/shorten', { fullUrl: url })
        .then(response => {
            bot.sendMessage(chatId, `Ваша сокращенная ссылка: ${response.data.shortUrl}`);
        })
        .catch(error => {
            // Обработка ошибок
            bot.sendMessage(chatId, `Произошла ошибка: ${error.message}`);
        });
});

module.exports = bot;
