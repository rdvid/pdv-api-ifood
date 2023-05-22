import { Request, Response } from 'express';
import { s3 } from '../conexao';
import dotenv from 'dotenv'
dotenv.config();


const { BACKBLAZE_BUCKET, ENDPOINT_S3  } = process.env

type tipoRespostaPromise = Promise<Response<any, Record<string, any>>>;

const listarImagens = async (req: Request, res: Response): tipoRespostaPromise => {
    try {
        const { Contents } = await s3.listObjects({
            Bucket: `${BACKBLAZE_BUCKET}`
        }).promise()
    
        const files = Contents?.map((file)=>{
            return {
                title: file.Key,
                path: file.Key,
                size: file.Size,
                url: `https://${BACKBLAZE_BUCKET}.${ENDPOINT_S3}/${file.Key}`
            }
        })

        return res.json(files)

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

const cadastrarImagem = async (req: Request, res:Response): tipoRespostaPromise => {
    
    try {
        
        const file = req.file;

        const arquivo = await s3.upload({
            Bucket: `${BACKBLAZE_BUCKET}`,
            Key: `img-${+new Date}`,
            Body: file
        }).promise()

        return res.status(201).json({url: `https://${BACKBLAZE_BUCKET}.${ENDPOINT_S3}/${arquivo.Key}`})

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

export {
    listarImagens,
    cadastrarImagem
}