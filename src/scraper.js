const puppeteer = require('puppeteer')

async function buscarPromocoesAmazon() {
    console.log("Iniciano Busca Na Amazon ")
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')

    const url = 'https://www.amazon.com.br/deals'
    await page.goto(url, { waitUntil: 'networkidle2' })

    console.log('Página de ofertas carregada. Extraindo produtos...')

    const produtos = await page.evaluate(() => {
        const itens = []
        const seletorProduto = 'div,[data-testid="deal-card"]'
        //FICA FALTANDO A PARTE DO TRY ECHO DE ERRO E IF ELLSE E O DOCUMENT.QUERY SELECTOR 
        document.querySelectorAll(seletorProduto).forEach(el => {
            try {
                const tituloElement = el.querySelector('a > div > div .span')
                const precoElement = el.querySelector('div[data-testid="dea-price"]>span')
                const linkElement = el.querySelector('a')
                const imageElement = el.querySelector('a > div > div > img')

                if (tituloElement && precoElement && linkElement && imageElement) {
                    const titulo = tituloElement.innerText.trim()
                    const preco = precoElement.innerText.trim()
                    const link = linkElement.href.split('?')[0]
                    const imageUrl = imageElement.src

                    itens.push({ titulo, preco, link, imageUrl })

                }
            } catch (e) {
                console.log('Error ao extrair o produto', e)
            }
        })
        return itens
    })
    await browser.close()
    console.log(`Encontrados ${produtos.length} Produtos `)
    return produtos.slice(0,5)
}

module.exports  = {buscarPromocoesAmazon}
