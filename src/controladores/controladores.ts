import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import knex from '../conexao'

type tipoRespostaPromise = Promise<Response<any, Record<string, any>>>;

const cadastrarUsuario = async (req: Request, res: Response): tipoRespostaPromise => {
    try {
        const { nome, email, senha }: { nome: string, email: string, senha: string } = req.body
        const senhaHash: string = await bcrypt.hash(senha.toString(), 10);
        await knex('usuarios').insert({ nome, email, senha: senhaHash });
        return res.status(204).send();
    } catch (error: any) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

export {
    cadastrarUsuario
}