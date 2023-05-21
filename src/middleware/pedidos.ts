import { Request, Response, NextFunction } from 'express';
import knex from '../conexao'


const existeCliente_id = async (req: Request, res: Response, next: NextFunction) => {
    const { cliente_id }: { cliente_id: string } = req.body
    if (!cliente_id) {
        return res.status(400).json({ mensagem: "Informe o identificador do cliente para prosseguir." })
    }
    try {
        const clienteCadastrado: boolean = !!await knex('clientes').select('*').where({ id: cliente_id }).first();
        if (!clienteCadastrado) {
            return res.status(401).json({ mensagem: "Cliente não localizado, por gentileza verifique os dados informados e tente novamente." })
        }
        next()
    } catch (erro: any) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}

const validaprodutos_pedido = async (req: Request, res: Response, next: NextFunction) => {
    const { pedido_produtos }: { pedido_produtos: string[] } = req.body
    if (!pedido_produtos) {
        return res.status(400).json({ mensagem: "Para realizar um pedido insira produtos." })
    }
    if (pedido_produtos.length < 1) {
        return res.status(400).json({ mensagem: "Para realizar um pedido insira produtos." })
    }
    try {
        for (let i = 0; i < pedido_produtos.length; i++) {

            const idProduto: string = req.body.pedido_produtos[i].produto_id
            const quantidade: number = req.body.pedido_produtos[i].quantidade_produto
            const produtosBase = await knex('produtos').where({ id: idProduto }).first()

            if (!produtosBase) {
                return res.status(401).json({ mensagem: `O produto ${idProduto} não foi localizado.` })
            }
            if (i < pedido_produtos.length - 1 && idProduto == req.body.pedido_produtos[i + 1].produto_id) {
                return res.status(400).json({ mensagem: "Cada produto deve ser inserido uma única vez no pedido" })
            }
            if (quantidade <= 0) {
                return res.status(400).json({ mensagem: `Insira uma quantidade de produto válida para o produto ${idProduto}` })
            }
            if (quantidade > produtosBase.quantidade_estoque) {
                return res.status(400).json({ mensagem: `A quantidade solicitada do produto ${idProduto} está acima do estoque disponível` })
            }
        }
        next()
    } catch (erro: any) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}
const validaIdPedido = async (req: Request, res: Response, next: NextFunction) => {
    const { cliente_id } = req.query
    try {
        if (cliente_id) {
            const consulta = await knex('pedidos').where({ cliente_id })
            if (!consulta[0]) {
                return res.status(400).json({ mensagem: "Não existe pedido para o cliente solicitado" })
            }
        }
        next()
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}

export {
    existeCliente_id,
    validaprodutos_pedido,
    validaIdPedido
}