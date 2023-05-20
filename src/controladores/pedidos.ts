import { Request, Response } from 'express';
import knex from '../conexao';
// import { Transporter } from '../Config/email.js';
import nodemailer from 'nodemailer'
// import email from '../Config/email';

interface Produto {
    produto_id: number,
    quantidade_produto: number
}
interface PedidoProduto {
    client_id: string;
    observacao: string;
    pedido_produtos: Produto[]
}

type tipoRespostaPromise = Promise<Response<any, Record<string, any>>>;

const cadastraPedido = async (req: Request, res: Response): tipoRespostaPromise => {
    const { cliente_id, observacao, pedido_produtos }: { cliente_id: number, observacao: string, pedido_produtos: Produto[] } = req.body

    try {
        const idPedido = await knex('pedidos').insert({ cliente_id, observacao }).returning(['id'])
        const pedido_id = idPedido[0].id
        let valor_total: number = 0
        for (let i: number = 0; i < pedido_produtos.length; i++) {
            const produto_id = pedido_produtos[i].produto_id
            const quantidade_produto: number = pedido_produtos[i].quantidade_produto
            const { valor, quantidade_estoque } = await knex('produtos').select('valor', 'quantidade_estoque').where({ id: produto_id }).first()
            await knex('pedido_produtos').insert({ pedido_id, produto_id, quantidade_produto, valor_produto: valor })
            valor_total = valor_total + (valor * quantidade_produto)
            const novoEstoque = quantidade_estoque - quantidade_produto
            await knex('produtos').update({ quantidade_estoque: novoEstoque }).where({ id: produto_id })
        }
        await knex('pedidos').update({ valor_total }).where({ id: pedido_id })
        const cliente = await knex('clientes').select('nome', 'email').where({ id: cliente_id }).first()

        const transportador = nodemailer.createTransport({
            service: 'Gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        });
        const email = {
            from: process.env.EMAIL_FROM,
            to: "wladimir12oliveira@gmail.com",
            subject: '👀 Hola ',
            template: "chegou o e-mail"
            // context: { "incident" }
        };
        await transportador.sendMail(email).catch(error => {
            console.log(error);
        });
        // enviar e-mail
        return res.status(200).json({ mensagem: "cadastrou" })
    } catch (erro: any) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}
const listaPedidos = async (req: Request, res: Response): tipoRespostaPromise => {
    const { cliente_id } = req.query
    try {
        let retorno: object[] = []
        if (!cliente_id) {
            let listaTodos = await knex('pedidos')
            for (let i = 0; i < listaTodos.length; i++) {
                const pedido = listaTodos[i]
                let pedido_produtos = await knex('pedido_produtos').where({ pedido_id: pedido.id })
                let objeto = { pedido, pedido_produtos }
                retorno.push(objeto)
            }
        } else {
            const listaPorId = await knex('pedidos').select('id', 'valor_total', 'observacao', 'cliente_id').where({ cliente_id })
            for (let i = 0; i < listaPorId.length; i++) {
                const pedido = listaPorId[i]
                let pedido_produtos = await knex('pedido_produtos').select('id', 'quantidade_produto', 'valor_produto', 'pedido_id', 'produto_id').where({ pedido_id: pedido.id })
                let objeto = { pedido, pedido_produtos }
                retorno.push(objeto)
            }
        }
        if (retorno.length < 1) {
            return res.status(200).json({ mensagem: 'Não existem pedidos cadastrados' })
        }
        return res.status(200).json(retorno)
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidos" })
    }
}
export {
    cadastraPedido,
    listaPedidos
}