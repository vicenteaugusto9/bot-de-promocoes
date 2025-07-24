
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios'); 

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token);

async function postarNoCanal(produto, linkAfiliado, chatId) {
  const mensagem = `
🚨 **OFERTA IMPERDÍVEL** 🚨

✨ **${produto.titulo}**

💰 **Preço: ${produto.preco}**

🔗 **Compre aqui:** ${linkAfiliado}
  `;

  try {

    if (!produto.imagemUrl || !produto.imagemUrl.startsWith('http')) {
        throw new Error('URL da imagem inválida.');
    }

    console.log(`Baixando imagem de: ${produto.imagemUrl}`);
    

    const response = await axios.get(produto.imagemUrl, {
      responseType: 'arraybuffer' 
    });
    const imageBuffer = Buffer.from(response.data, 'binary');

    console.log('Imagem baixada com sucesso. Enviando para o Telegram...');


    await bot.sendPhoto(chatId, imageBuffer, {
      caption: mensagem,
      parse_mode: 'Markdown'
    });
    console.log(`Produto "${produto.titulo}" postado com sucesso!`);

  } catch (error) {
    let errorMsg = 'Erro desconhecido ao postar no Telegram.';
    if (error.response && error.response.body) {
   
        errorMsg = error.response.body.description;
    } else if (error.request) {
   
        errorMsg = `Não foi possível baixar a imagem da URL: ${produto.imagemUrl}`;
    } else {
     
        errorMsg = error.message;
    }
    console.error('ERRO AO POSTAR NO TELEGRAM:', errorMsg);
    
 
    console.log('Enviando apenas o texto como alternativa...');
    await bot.sendMessage(chatId, `${mensagem}\n\n(Não foi possível carregar a imagem da oferta)`);
  }
}

module.exports = { postarNoCanal };