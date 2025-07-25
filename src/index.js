require('dotenv').config();

const cron = require('node-cron');


const { buscarPromocoesAmazon } = require('./scraper.js');
const { buscarPromocoesMercadoLivre } = require('./mecadoLivreScraper.js'); 
const { gerarLinkAfiliado } = require('./afiliado');
const { postarNoCanal } = require('./telegram');

const AMAZON_AFFILIATE_TAG = process.env.AMAZON_AFFILIATE_TAG;
const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;

async function rodarBot() {
    console.log('====================================');
    console.log('Iniciando nova verificação de ofertas...');

    try {
        
        console.log('Buscando promoções na Amazon...');
        const produtosAmazon = await buscarPromocoesAmazon();
        console.log(`-> Encontrados ${produtosAmazon.length} produtos na Amazon.`);

        console.log('Buscando promoções no Mercado Livre...');
        const produtosML = await buscarPromocoesMercadoLivre();
        console.log(`-> Encontrados ${produtosML.length} produtos no Mercado Livre.`);

        // 3. JUNTAMOS OS RESULTADOS EM UMA ÚNICA LISTA
        const todosOsProdutos = [...produtosAmazon, ...produtosML];
        console.log(`Total de ${todosOsProdutos.length} produtos encontrados nas duas lojas.`);

        if (todosOsProdutos.length === 0) {
            console.log('Nenhuma promoção encontrada desta vez.');
            return;
        }

        for (const produto of todosOsProdutos) {
            let linkAfiliado = produto.link; 

            if (produto.link.includes('amazon.com.br')) {
                linkAfiliado = gerarLinkAfiliado(produto.link, AMAZON_AFFILIATE_TAG);
            }

            await postarNoCanal(produto, linkAfiliado, TELEGRAM_CHANNEL_ID);

        
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    } catch (error) {
        console.error('Ocorreu um erro no ciclo principal do bot:', error);
    } finally {
        console.log('Verificação de ofertas finalizada.');
        console.log('====================================\n');
    }
}

// 
cron.schedule('*/30 * * * *', () => {
    console.log('Tarefa agendada sendo executada...');
    rodarBot();
});

console.log('Bot de promoções iniciado. Primeira execução em andamento...');
rodarBot();