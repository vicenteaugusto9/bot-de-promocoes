
const puppeteer = require('puppeteer');

async function buscarPromocoesAmazon() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  const url = 'https://www.amazon.com.br/deals';
  await page.goto(url, { waitUntil: 'networkidle2' });

  try {
    await page.waitForSelector('div[class*="GridItem-module__container"]', { timeout: 15000 });
  } catch (error) {
    console.log('Não foi possível carregar os produtos a tempo. Encerrando a busca.');
    await browser.close();
    return [];
  }
  
  const produtos = await page.evaluate(() => {
    const itens = [];
    const seletorProduto = 'div[class*="GridItem-module__container"]';
    
    document.querySelectorAll(seletorProduto).forEach(el => {
      const tituloElement = el.querySelector('[class*="ProductCard-module__title"]');
      const linkElement = el.querySelector('a[data-testid="product-card-link"]');

      if (tituloElement && linkElement) {
        const titulo = tituloElement.innerText.trim();
        const link = linkElement.href.split('?')[0];

        const secaoPreco = el.querySelector('div[data-testid="price-section"]');
        const precoElement = secaoPreco ? secaoPreco.querySelector('.a-price') : null;
        const preco = precoElement ? precoElement.innerText.trim() : 'Verificar no site';
        
     
        const imagemElement = el.querySelector('img');
        let urlBruta = '';
        if (imagemElement) {
          urlBruta = imagemElement.srcset ? imagemElement.srcset.split(',')[0].split(' ')[0] : imagemElement.src;
        }

        let imagemUrl = urlBruta;
        if (urlBruta.includes('._')) {

          imagemUrl = urlBruta.substring(0, urlBruta.indexOf('._')) + '.jpg';
        }
    
        
        if (imagemUrl && imagemUrl.startsWith('http')) {
            itens.push({ titulo, preco, link, imagemUrl });
        }
      }
    });
    return itens;
  });
  
  await browser.close(); 
  
  
  const produtosValidos = produtos.filter(p => p.imagemUrl.endsWith('.jpg'));

  return produtosValidos;
}

module.exports = { buscarPromocoesAmazon };