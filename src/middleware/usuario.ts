import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, string } from 'joi';
import knex from '../conexao'
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const senhaJwt: Secret = process.env.JWT_SECRET_KEY!;

const validarCamposBody = (joiSchema: ObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await joiSchema.validateAsync(req.body)
        next();
    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const validarLogin = (joiSchema: ObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    const { email, senha }: { email: string, senha: string } = req.body
    try {
        await joiSchema.validateAsync(req.body);

        const usuario = await knex('usuarios').where({ email: email })
        const verificarSenha = await bcrypt.compare(senha, usuario[0].senha);
        if (!verificarSenha) {
            return res.status(401).json({ mensagem: "senha incorreta." })
        }
        next();
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

const emailExiste = (vlrEsperado: boolean, tabela: string) => async (req: Request, res: Response, next: NextFunction) => {
    const { email }: { email: string } = req.body
    try {

        const emailExists: boolean = !!await knex(tabela).select('*').where({ email: email }).first();

        if (emailExists === vlrEsperado) {
            next();
        } else {

            if (emailExists) {
                return res.status(409).json({ mensagem: "Não é possível prosseguir, o e-mail informado já existe em nossa base de dados!" });
            };

            if (!emailExists) {
                return res.status(401).json({ mensagem: "O usuário informado não foi encontrado, verifique os dados e tente novamente!" });
            }
        }

    } catch (error: any) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const usuarioLogado = async (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: "Usuário não logado" })
    }

    const token: string = authorization.split(" ")[1] as string

    try {

        const { usuario } = jwt.verify(token, senhaJwt) as JwtPayload
        const usuarioLogado = await knex('usuarios').where({ id: usuario })
        if (!usuarioLogado) {
            return res.status(401).json({ mensagem: "Usuário não autorizado" })
        }
        next();

    } catch (error) {
        return res.status(500).json({ mensagem: "Sua sessão expirou, realize o login novamente" })
    }

}



export {
    validarCamposBody,
    validarLogin,
    emailExiste,
    usuarioLogado
}