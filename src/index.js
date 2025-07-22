const cron = require('node-cron')

const { buscarPromocoesAmazon } = require('./scraper');
const { gerarLinkAfiliado } = require('./afiliado');
const { postarNoCanal } = require('./telegram');

const AMAZON_AFILIATE_TAG = 'v1c3nt3g0m3s-20'
const TELEGRAM_CHANNEL_ID = '-1002890802836'

async function rodarBot(params) {
    console.log('====================================')
    console.log('iniciando nova verificacoes de ofertas ')


    try {

        const produtos = await buscarPromocoesAmazon()

        if (produtos.length === 0){
            console.log (' nenhuma  promocao encontrada desta vez ')
            return 
        }

        for ( const produto of produtos) {
            const linkAfiliado = gerarLinkAfiliado(produto.link,AMAZON_AFILIATE_TAG)
            await postarNoCanal(produto,linkAfiliado,TELEGRAM_CHANNEL_ID)

            await new Promise(resolve => setTimeout(resolve,5000))
        }
    } catch (error) {

        console.error('ocorreu um erro no ciclo principal do bot:', error)

    }finally {
        console.log(' verificacao de ofertas finalizadas.')
        console.log(' ====================================\n')
    }
}

// cron.schedule('0 * * * *', () =>{
//     console.log('tarefa agenda sendo executada....')
//     rodarBot()
// })

console.log('Bot de promocoes inciado. primeira execucao em andamento...')
rodarBot()