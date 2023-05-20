import { Request, Response, NextFunction } from 'express';
import { knexSetup as knex } from '../conexao'
import dotenv from 'dotenv';
dotenv.config();

const categoriaExiste = async (req: Request, res: Response, next: NextFunction) => {
    const { categoria_id } = req.body
    try {
        const categoria = await knex('categorias').where({id: categoria_id})
        if(!categoria){
            return res.status(404).json({mensagem: "categoria inválida."})
        }
        next();
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
};

const produtoExiste = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    
    try {
        
        const produto = await knex('produtos').where({id: id}).first()

        if(!produto){
            return res.status(404).json({mensagem: "Produto não encontrado."})
        }

        req.body.produto_imagem = produto.produto_imagem
    
        next();
        
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }

};

export {
    categoriaExiste,
    produtoExiste,
}