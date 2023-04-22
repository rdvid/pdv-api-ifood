import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import knex from '../conexao';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const senhaJwt: Secret = process.env.JWT_SECRET_KEY!;

type tipoRespostaPromise = Promise<Response<any, Record<string, any>>>;

const cadastrarUsuario = async (req: Request, res: Response): tipoRespostaPromise => {
    try {
        const { nome, email, senha }: { nome: string, email: string, senha: string } = req.body
        const senhaHash: string = await bcrypt.hash(senha.toString(), 10);
        const insert = await knex('usuarios').insert({ nome, email, senha: senhaHash }).returning(['id', 'nome', 'email']);
        return res.status(201).json(insert[0]);
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const login = async (req: Request, res: Response): tipoRespostaPromise => {
    const { email, senha }: { email: string, senha: string } = req.body

    try {
        const usuario = await knex('usuarios').where({ email: email })
        const token = jwt.sign({ usuario: usuario[0].id }, senhaJwt, { expiresIn: "6h" })
        const { senha: _, ...usuarioLogado } = usuario[0]
        return res.status(200).json({
            usuario: usuarioLogado,
            token
        })
    } catch (err: any) {
        console.log(err)
        return res.status(500).json({ mensagem: `erro interno do servidor ${err.message}` })
    }
};

export {
    cadastrarUsuario,
    login
}