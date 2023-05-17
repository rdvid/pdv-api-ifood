import { Request, Response } from 'express';
import { knexSetup as knex, s3 } from '../conexao';
import dotenv from 'dotenv'

dotenv.config();

type tipoRespostaPromise = Promise<Response<any, Record<string, any>>>;

const listarImagens = async (req: Request, res: Response): tipoRespostaPromise => {
    try {
        const { Contents } = await s3.listObjects({
            Bucket: `${process.env.BACKBLAZE_BUCKET}`
        }).promise()
    
        return res.json(Contents)

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

export {
    listarImagens
}