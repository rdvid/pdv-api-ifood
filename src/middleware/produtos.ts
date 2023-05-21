import { Request, Response, NextFunction } from 'express';
import { knexSetup as knex, s3 } from '../conexao'
import dotenv from 'dotenv';
dotenv.config();

const { BACKBLAZE_BUCKET, ENDPOINT_S3 } = process.env

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

const excluirImagem = async (req: Request, res:Response, next: NextFunction) => {

    try {
        const { produto_imagem } = req.body;

        if(!produto_imagem){

            const { id } = req.params;
            const produto = await knex('produtos').where({id}).first()
    
            if(produto.produto_imagem){

                await s3.deleteObject({
                    Bucket: `${BACKBLAZE_BUCKET}`,
                    Key: produto.produto_imagem
                }).promise()
    
            }
        }

        next();

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

const validaUrlDeImagem =  async (req: Request, res:Response, next: NextFunction) => {
    try {
        const { produto_imagem } = req.body;

        if(produto_imagem){

            const URLBUCKET = `https://${BACKBLAZE_BUCKET}.${ENDPOINT_S3}/`
    
            if(!produto_imagem.includes(URLBUCKET)){
                return res.status(400).json({mensagem: 'Favor inserir uma url válida.'})
            }
    
            const { Contents } = await s3.listObjects({
                Bucket: `${BACKBLAZE_BUCKET}`
            }).promise()
        
            const urls = Contents?.map((file)=>{
                return {
                    url: `https://${BACKBLAZE_BUCKET}.${ENDPOINT_S3}/${file.Key}`
                }
            })
    
            const imagem = urls?.find((imagem) => {
                return imagem.url === produto_imagem
            })
    
            if(!imagem){
                return res.status(404).json({mensagem: 'Imagem não encontrada. Insira uma url de imagem válida.'})
            }
    
            const produto = await knex('produtos').where({produto_imagem: imagem.url}).first()

            if(produto){
                return res.status(400).json({mensagem: 'essa imagem já está atribuida a um produto.'})
            }

        }

        next();

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

export {
    categoriaExiste,
    produtoExiste,
    excluirImagem,
    validaUrlDeImagem
}