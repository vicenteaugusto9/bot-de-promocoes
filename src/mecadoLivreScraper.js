const puppeteer = require('puppeteer')

async function buscarPromocoesMercadoLivre() {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')

    const url = 'https://www.mercadolivre.com.br/ofertas'
    await page.goto(url, { waitUntil: 'networkidle2' })

    try {
        await page.waitForSelector('div[class*="GridItem-module__container"]', { timeout: 4000 })
    } catch (error) {
        console.log('Não foi possível carregar os produtos a tempo. Encerrando a busca.')
        await browser.close()
        return []
    }

    const produtos = await page.evaluate(() => {
    const itens = [];
    
    const seletorProduto = '.andes-card'; 

    document.querySelectorAll(seletorProduto).forEach(el => {
        try {
         
            const tituloElement = el.querySelector('.poly-component__title-wrapper');
            const linkElement = el.querySelector('a.poly-component__title');
            const precoElement = el.querySelector('.poly-price__current');
            const imagemElement = el.querySelector('.poly-component__picture');

         
            if (tituloElement && linkElement && imagemElement) {
                const titulo = tituloElement.innerText.trim();
                const link = linkElement.href; 
                const preco = precoElement ? precoElement.innerText.trim() : 'Verificar no site';

    
                const imagemUrl = imagemElement.dataset.src || imagemElement.src;
                
             
                if (imagemUrl && imagemUrl.startsWith('http')) {
                    itens.push({ titulo, preco, link, imagemUrl });
                }
            }
        } catch (e) {
            
            console.error('Erro ao extrair um produto do ML:', e);
        }
    });
    return itens;
});
    
    await browser.close(); 
  
  
  const produtosValidos = produtos.filter(p => p.imagemUrl.endsWith('.jpg'));

  return produtosValidos;
}

module.exports = {buscarPromocoesMercadoLivre}