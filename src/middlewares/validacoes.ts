import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import knex from '../conexao'
type tipoRespostaPromise = Promise<Response<any, Record<string, any>>>;

const validarCamposBody = (joiSchema: ObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await joiSchema.validateAsync(req.body)
        next();
    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
};
const emailExiste = (vlrEsperado: boolean) => async (req: Request, res: Response, next: NextFunction) => {
    const { email }: { email: string } = req.body
    try {
        const emailExists: boolean = !!await knex('usuarios').select('*').where({ email: email }).first();
        if (emailExists === vlrEsperado) {
            next();
        } else {
            if (emailExists) {
                return res.status(500).json({ mensagem: "Não é possível prosseguir, o e-mail informado já existe em nossa base de dados!" });
            };
            if (!emailExists) {
                return res.status(500).json({ mensagem: "O usuário informado não foi encontrado, verifique os dados e tente novamente!" });
            }
        }
    } catch (error: any) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};
export {
    validarCamposBody,
    emailExiste
}