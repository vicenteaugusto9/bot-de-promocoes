const puppeteer = require('puppeteer')

async function buscarPromocoesMercadoLivre() {
    const browser = await puppeteer.launch({headless:true})
    const page = await browser.newPage()

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')

    const url = 'https://www.mercadolivre.com.br/ofertas'
    await page.goto(url,{waitUntil:'networkidle2'})

    try {
        await page.waitForSelector('div[class*="GridItem-module__container"]',{timeout:1500})
    } catch (error){
        console.log('Não foi possível carregar os produtos a tempo. Encerrando a busca.')
        await browser.close()
        return []
    }
}