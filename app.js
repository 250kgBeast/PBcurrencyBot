const TelegramBot = require('node-telegram-bot-api');


const token = '1008071441:AAEr9-CAbi3YioeDczuWRG09scGhjqUcbE0';


const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/curse/, (msg, match) => {
  

  const chatId = msg.chat.id;
  

  bot.sendMessage(chatId, 'chose your currency', {
    reply_markup: {
      inline_keyboard: [
      [
      {
        text: "€ EUR",
        callback_data: "EUR"
      },
      {
        text: " $ USD",
        callback_data: "USD"
      }, 
      {
        text: "₽ RUR",
        callback_data: "RUR"
      }
      ]
    ]
    }
  });
});
bot.on("callback_query", query =>{
  const id = query.message.chat.id;
  const request = require('request');
  request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5' , function(error, response,body){
    const data = JSON.parse(body);
    const result = data.filter(item => item.ccy === query.data)[0];
  //console.log(result);
    let md = `
      *${result.ccy} => ${result.base_ccy}*
      Buy: _${result.buy}_
      Sale: _${result.sale}_
    `;
    bot.sendMessage(id, md, {parse_mode: 'Markdown'});
  })
}

