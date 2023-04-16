import { Request, Response } from 'express';
import knex from '../conexao'

type tipoRespostaPromise = Promise<Response<any, Record<string, any>>>;

export const cadastrarUsuario = async (req: Request, res: Response): tipoRespostaPromise => {
    const consulta = await knex('categorias').select('*');
    return res.status(200).json(consulta);
};

export const controladores = {
    cadastrarUsuario
}