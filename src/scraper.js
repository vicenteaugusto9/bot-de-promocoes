// scraper.js - VERSÃO DE DEPURAÇÃO AVANÇADA

const puppeteer = require('puppeteer');

async function buscarPromocoesAmazon() {
  console.log('Iniciando busca por promoções na Amazon...');
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // =================== MÁGICA DA DEPURAÇÃO ===================
  // Esta parte faz com que qualquer 'console.log' dentro do navegador
  // apareça no nosso terminal do Node.js.
  page.on('console', msg => console.log('LOG DO NAVEGADOR:', msg.text()));
  // ==========================================================

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  const url = 'https://www.amazon.com.br/deals';
  await page.goto(url, { waitUntil: 'networkidle2' });

  try {
    console.log('Esperando os cards de produtos aparecerem na página...');
    await page.waitForSelector('div[class*="GridItem-module__container"]', { timeout: 10000 });
    console.log('Cards de produtos carregados! Iniciando a extração detalhada.');
  } catch (error) {
    console.log('Os produtos não apareceram a tempo.');
    await browser.close();
    return [];
  }
  
  const produtos = await page.evaluate(() => {
    const itens = [];
    const seletorProduto = 'div[class*="GridItem-module__container"]';
    
    document.querySelectorAll(seletorProduto).forEach((el, index) => {
  console.log(`--- Processando Card #${index + 1} ---`);

  const tituloElement = el.querySelector('[class*="ProductCard-module__title"]');
  const secaoPreco = el.querySelector('div[data-testid="price-section"]');
  const precoElement = secaoPreco ? secaoPreco.querySelector('.a-price') : null;
  const linkElement = el.querySelector('a[data-testid="product-card-link"]');

  
  if (tituloElement && linkElement) {
    console.log('>>> SUCESSO: Card com dados essenciais encontrado!');
    
    const titulo = tituloElement.innerText.trim();
    
    const preco = precoElement ? precoElement.innerText.trim() : 'Verificar no site';
    const link = linkElement.href.split('?')[0];
    const imagemElement = el.querySelector('img');
    const imagemUrl = imagemElement ? imagemElement.src : 'IMAGEM_NAO_DISPONIVEL';
    
    itens.push({ titulo, preco, link, imagemUrl });
  } else {
    console.log('>>> FALHA: Card sem título ou link, pulando.');
  }
    });
    return itens;
  });
  
  console.log(`Script encontrou ${produtos.length} produtos válidos.`);
  console.log('>>> NAVEGADOR PERMANECERÁ ABERTO PARA INSPEÇÃO. <<<');
  
  // await browser.close(); 
  
  return produtos;
}

module.exports = { buscarPromocoesAmazon };