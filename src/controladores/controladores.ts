import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import knex from '../conexao';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { viaCepApi } from '../Config/APIs';
import { AnyARecord } from 'dns';
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
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const login = async (req: Request, res: Response): tipoRespostaPromise => {
    const { email, senha }: { email: string, senha: string } = req.body
    try {
        const usuario = await knex('usuarios').where({ email: email })
        const token = jwt.sign({ usuario: usuario[0].id }, senhaJwt, { expiresIn: "6h" })
        //const { senha: _, ...usuarioLogado } = usuario[0]
        return res.status(200).json({
            //usuario: usuarioLogado,
            token
        })
    } catch (err: any) {
        return res.status(500).json({ mensagem: `erro interno do servidor ${err.message}` })
    }
};
const inspecionarUsuario = async (req: Request, res: Response): tipoRespostaPromise => {
    const token: string = req.headers.authorization?.split(" ")[1] as string
    const { usuario } = jwt.decode(token) as JwtPayload

    try {

        let usuarioRetornado = await knex('usuarios').where({ id: usuario })
        const { senha: _, ...usuarioSemSenha } = usuarioRetornado[0]

        return res.status(200).json(usuarioSemSenha)

    } catch (error: any) {
        return res.status(200).json({ mensagem: "Erro interno de servidor" })
    }
};

const editarUsuario = async (req: Request, res: Response): tipoRespostaPromise => {
    const token: string = req.headers.authorization?.split(" ")[1] as string
    const { usuario } = jwt.decode(token) as JwtPayload
    try {
        const { nome, email, senha }: { nome: string, email: string, senha: string } = req.body
        const senhaHash: string = await bcrypt.hash(senha.toString(), 10)
        await knex('usuarios').update({ nome, email, senha: senhaHash }).where({ id: usuario })
        return res.status(200).json({ mensagem: "usuario atualizado" })
    } catch (error: any) {
        return res.status(500).json({ mensagem: "Erro interno de servidor2" })
    }
};

const listarCategorias = async (req: Request, res: Response): tipoRespostaPromise => {
    try {
        const consulta = await knex('categorias');
        return res.status(200).json(consulta)
    } catch (error: any) {
        return res.status(500).json({ mensagem: "Erro interno de servidor" })
    }
};

const cadastraCliente = async (req: Request, res: Response): tipoRespostaPromise => {
    try {
        let { nome, email, cpf, cep, rua, numero, bairro, cidade, estado }: { nome: string, email: string, cpf: string, cep: string, rua: string, numero: string, bairro: string, cidade: string, estado: string, } = req.body
        let cpfarray: string[] = cpf.split("")
        let cpfFormatado: string = ""
        for (let item of cpfarray) {
            if (item >= "0" && item <= "9") {
                cpfFormatado += item
            }
        }
        // let cpfNumerico: number = parseInt(cpfFormatado)

        let dadosCliene = { nome, email, cpf: cpfFormatado, cep, rua, numero, bairro, cidade, estado }

        if (estado != "") {
            if (estado.length != 1) {
                return res.status(400).json({ mensagem: "O estado deve ser informado no padrão de Unidade Federativa (UF)" })
            }
        }
        let cepFormatado: string = ""
        if (cep != "") {
            let cepArray: string[] = cep.split("")
            for (let item of cepArray) {
                if (item >= "0" && item <= "9") {
                    cepFormatado += item
                }
            }
            if (cepFormatado.length != 8) {
                return res.status(400).json({ mensagem: "CEP inválido. verifique os dados inseridos e tente novamente!" })
            }
            let { data } = await viaCepApi.get(`/${cepFormatado}/json`)
            dadosCliene = { nome, email, cpf: cpfFormatado, cep: data.cep.replace("-", ""), rua: data.logradouro, numero, bairro: data.bairro, cidade: data.localidade, estado: data.uf }
        }
        await knex('clientes').insert(dadosCliene);
        return res.status(201).json({ mensagem: "cliente cadastrado" });
    } catch (erro: any) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}

const AlteraCadastraCliente = async (req: Request, res: Response): tipoRespostaPromise => {
    try {
        let idCliente: string = req.params.id
        let { nome, email, cpf, cep, rua, numero, bairro, cidade, estado }: { nome: any, email: any, cpf: any, cep: any, rua: any, numero: any, bairro: any, cidade: any, estado: any, } = req.body
        let cpfarray: string[] = cpf.split("")
        let cpfFormatado: string = ""
        for (let item of cpfarray) {
            if (item >= "0" && item <= "9") {
                cpfFormatado += item
            }
        }
        let cepFormatado: any = ""
        if (cep != "") {
            let cepArray: string[] = cep.split("")
            for (let item of cepArray) {
                if (item >= "0" && item <= "9") {
                    cepFormatado += item
                }
            }
            if (cepFormatado.length != 8) {
                return res.status(400).json({ mensagem: "CEP inválido. verifique os dados inseridos e tente novamente!" })
            }
        }
        if (estado != "") {
            if (estado.length != 1) {
                return res.status(400).json({ mensagem: "O estado deve ser informado no padrão de Unidade Federativa (UF)" })
            }
        }
        if (cep == "") {
            cepFormatado = null
        }
        if (rua == "") {
            rua = null
        }
        if (numero == "") {
            numero = null
        }
        if (bairro == "") {
            bairro = null
        }
        if (cidade == "") {
            cidade = null
        }
        if (estado == "") {
            estado = null
        }

        await knex('clientes').update({ nome, email, cpf: cpfFormatado, cep: cepFormatado, rua, numero, bairro, cidade, estado }).where({ 'id': idCliente })
        return res.status(201).json({ mensagem: "Dados alterados com sucesso" })
    } catch (erro: any) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}
const listarClientes = async (req: Request, res: Response): tipoRespostaPromise => {
    try {
        const consulta = await knex('clientes');
        return res.status(200).json(consulta)
    } catch (error: any) {
        return res.status(500).json({ mensagem: "Erro interno de servidor" })
    }
}

const detalhaCliente = async (req: Request, res: Response): tipoRespostaPromise => {
    let idCliente: string = req.params.id
    try {
        const consulta = await knex('clientes').where({ id: idCliente })
        if (!consulta[0]) {
            return res.status(404).json({ mensagem: "Não existe cliente cadastrado para o id informado" })
        }
        return res.status(200).json(consulta[0])
    } catch (error: any) {
        return res.status(500).json({ mensagem: "Erro interno de servidor" })
    }
}

export {
    cadastrarUsuario,
    login,
    inspecionarUsuario,
    editarUsuario,
    listarCategorias,
    cadastraCliente,
    AlteraCadastraCliente,
    listarClientes,
    detalhaCliente
}