import { Request, Response } from 'express';
import knex from '../conexao';
import dotenv from 'dotenv';
import { viaCepApi } from '../Config/APIs';
dotenv.config();


type tipoRespostaPromise = Promise<Response<any, Record<string, any>>>;

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
        let dadosCliene = { nome, email, cpf: cpfFormatado, cep, rua, numero, bairro, cidade, estado }

        if (estado) {
            if (estado.length != 2) {
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
            if (estado.length != 2) {
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
    const idteste = await knex('clientes').orderBy('id', 'desc').first()
    console.log(idteste.id)
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
const deletaCliente = async (req: Request, res: Response): tipoRespostaPromise => {
    try {
        const { id } = req.params
        const clienteExiste = await knex('clientes').where({ id: id }).first()
        if (!clienteExiste) {
            return res.status(404).json({ mensagem: "cliente não encontrado" })
        }
        await knex('clientes').delete().where({ id: id })
        return res.status(204).send()
    } catch (erro: any) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}

export {
    cadastraCliente,
    AlteraCadastraCliente,
    listarClientes,
    detalhaCliente,
    deletaCliente
}