const telegramBot = require('node-telegram-bot-api')

const token = '8124888859:AAE6LDzraqVeQz5d9WVz85bTYd5r_KJ1_NU'
const bot = new telegramBot(token)

async function postarNoCanal(produto,linkAfiliado,chatId) {
    const mensage = `
    🚨 **OFERTA IMPERDÍVEL** 🚨

        ✨ **${produto.titulo}**

    💰 **Preço: ${produto.preco}**

    🔗 **Compre aqui:** ${linkAfiliado}
  `
    try {

        await bot.sendPhoto(chatId, produto.imageUrl,{
            caption: mensage,
            parse_mode: 'Markdown'
        })
        console.log(`produto "${produto.titulo}" postado com sucesso `)
    } catch (error) {
        console.error ('error ao postar no telgram:', error.response.body.description)
    }
    
}

module.exports ={postarNoCanal}