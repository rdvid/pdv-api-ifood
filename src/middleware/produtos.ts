import { Request, Response, NextFunction } from 'express';
// import { ObjectSchema, string } from 'joi';
import knex from '../conexao'
// import bcrypt from 'bcrypt';
// import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
// const senhaJwt: Secret = process.env.JWT_SECRET_KEY!;

const categoriaExiste = async (req: Request, res: Response, next: NextFunction) => {
    const { categoria_id } = req.body
    try {
        const categoria = await knex('categorias').where({ id: categoria_id })
        if (!categoria) {
            return res.status(404).json({ mensagem: "categoria inválida." })
        }
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

const produtoExiste = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {

        const produto = await knex('produtos').where({ id: id }).first()

        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado." })
        }

        next();

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }

}

const validaDelecaoProduto = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const constaEmPedido: Boolean = !!await knex('pedido_produtos').where({ produto_id: id }).first();
        if (constaEmPedido) {
            return res.status(400).json({ mensagem: "O produto não pode ser excluido pois esta vinculado a pedidos já registrados" })
        }
        next()
    } catch (erro: any) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
    }
}

export {
    categoriaExiste,
    produtoExiste,
    validaDelecaoProduto
}