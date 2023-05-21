import fs from 'fs/promises'
import handlebars from 'handlebars'

const compiladorHTML = async (arquivo: any, contexto: any) => {
    const html = await fs.readFile(arquivo)
    const compilador = handlebars.compile(html.toString())
    const htmlString = compilador(contexto)
    return htmlString
}

export { compiladorHTML }