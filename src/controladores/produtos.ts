import { Request, Response, response } from 'express';
// import bcrypt from 'bcrypt';
import knex from '../conexao';
// import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
// const senhaJwt: Secret = process.env.JWT_SECRET_KEY!;

type tipoRespostaPromise = Promise<Response<any, Record<string, any>>>;

const listarCategorias = async (req: Request, res: Response): tipoRespostaPromise => {
    try {
        const consulta = await knex('categorias');
        return res.status(200).json(consulta)
    } catch (error: any) {
        return res.status(500).json({ mensagem: "Erro interno de servidor" })
    }
};

const listarProdutos = async (req: Request, res: Response): tipoRespostaPromise => {

    try {
        const consulta = await knex('produtos');
        return res.status(200).json(consulta)
    } catch (error: any) {
        return res.status(500).json({ mensagem: "Erro interno de servidor" })
    }
};

const adicionarProduto = async (req: Request, res: Response): tipoRespostaPromise => {
    try {
        const { descricao, quantidade_estoque, valor, categoria_id }:
            { descricao: string, quantidade_estoque: number, valor: number, categoria_id: number } = req.body;

        const insert = await knex('produtos')
            .insert({ descricao, quantidade_estoque, valor, categoria_id })
            .returning(['descricao', 'quantidade_estoque', 'valor', 'categoria_id']);

        return res.status(201).json(insert[0]);

    } catch (error: any) {
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
};

const detalharProduto = async (req: Request, res: Response): tipoRespostaPromise => {

    try {
        const { id } = req.params
        const produto = await knex('produtos').where({ id: id }).first()

        return res.status(200).json(produto)

    } catch (error) {
        return res.status(200).json({ mensagem: 'Erro interno no servidor.' })
    }

};

const editarProduto = async (req: Request, res: Response): tipoRespostaPromise => {
    try {
        const { id } = req.params;
        const { descricao, quantidade_estoque, valor, categoria }:
            { descricao: string, quantidade_estoque: number, valor: number, categoria: number } = req.body;

        const produto = await knex('produtos').update({ descricao, quantidade_estoque, valor, categoria }).where({ id: id })
        return res.status(201).json({ mensagem: "Produto atualizado." })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
    }
}

const deletarProduto = async (req: Request, res: Response): tipoRespostaPromise => {
    try {
        const { id } = req.params;
        await knex('produtos').delete().where({ id: id });
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
    }
}

export {
    listarCategorias,
    listarProdutos,
    adicionarProduto,
    detalharProduto,
    editarProduto,
    deletarProduto
}