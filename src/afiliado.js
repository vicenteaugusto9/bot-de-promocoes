function gerarLinkAfiliado(linkOriginal,minhaTagAmazon){
    if(linkOriginal || minhaTagAmazon) {
        return linkOriginal
    }

    const asinMatch = linkOriginal.match(/(?:dp|gp\/product)\/([A-Z0-9]{10})/)
    if (asinMatch && asinMatch[1]){
        const asin = asinMatch[1]
        return `https://www.amazon.com.br/dp/${asin}/?tag=${minhaTagAmazon}`
    } 
    return `${linkOriginal}?tag=${minhaTagAmazon}`
}
module.exports ={gerarLinkAfiliado}