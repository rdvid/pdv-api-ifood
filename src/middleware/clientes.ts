import { Request, Response, NextFunction } from 'express';
import { knexSetup as knex }from '../conexao'
import { Cliente, Dict } from '../interfaces/interface';
import { viaCepApi } from '../Config/APIs';
import dotenv from 'dotenv';
dotenv.config();

const cpfValido = async (req: Request, res: Response, next: NextFunction) => {
    const { cpf }: { cpf: string } = req.body
    const textoDeRetorno: string = "CPF inválido. verifique os dados inseridos e tente novamente!"
    try {
        if (!cpf) {
            return res.status(400).json({ mensagem: "O Campo CPF é obrigatório" })
        }
        if (cpf.length < 11 || cpf.length > 14) {
            return res.status(400).json({ mensagem: textoDeRetorno })
        }
        let soma = 0
        let resto: number
        let cpfarray: string[] = cpf.split("")
        let cpfFormatado: string = ""
        for (let item of cpfarray) {
            if (item >= "0" && item <= "9") {
                cpfFormatado += item
            }
        }
        if (cpfFormatado.length !== 11) {
            return res.status(400).json({ mensagem: textoDeRetorno })
        }
        if (cpfFormatado == "00000000000") {
            return res.status(400).json({ mensagem: textoDeRetorno })
        }
        for (let i = 1; i <= 9; i++)
            soma = soma + parseInt(cpfFormatado.substring(i - 1, i)) * (11 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11)) resto = 0
        if (resto != parseInt(cpfFormatado.substring(9, 10)))
            return res.status(400).json({ mensagem: textoDeRetorno })
        soma = 0
        for (let i = 1; i <= 10; i++)
            soma = soma + parseInt(cpfFormatado.substring(i - 1, i)) * (12 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11)) resto = 0
        if (resto != parseInt(cpfFormatado.substring(10, 11)))
            return res.status(400).json({ mensagem: textoDeRetorno })
        next()
    } catch (erro: any) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
};

const cpfExistente = (vlrEsperado: boolean) => async (req: Request, res: Response, next: NextFunction) => {
    const { cpf }: { cpf: string } = req.body
    let cpfarray: string[] = cpf.split("")
    let cpfFormatado: string = ""
    for (let item of cpfarray) {
        if (item >= "0" && item <= "9") {
            cpfFormatado += item
        }
    }
    try {
        const cpfExists: boolean = !!await knex('clientes').select('*').where({ cpf: cpfFormatado }).first();

        if (cpfExists === vlrEsperado) {
            next();
        } else {

            if (cpfExists) {
                return res.status(409).json({ mensagem: "Não é possível prosseguir, o cpf informado já existe em nossa base de dados!" });
            };

            if (!cpfExists) {
                return res.status(401).json({ mensagem: "O usuário informado não foi encontrado, verifique os dados e tente novamente!" });
            }
        }
    } catch (erro: any) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
};

const validaAlteracaoCliente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idCliente: string = req.params.id
        const { email, cpf }: { email: string, cpf: string } = req.body

        let cpfarray: string[] = cpf.split("")
        let cpfFormatado: string = ""
        for (let item of cpfarray) {
            if (item >= "0" && item <= "9") {
                cpfFormatado += item
            }
        }
        
        const dadosCliente = await knex('clientes').select('*').where({ 'id': idCliente }).first()

        if (!dadosCliente) {
            return res.status(404).json({ mensagem: "Cliente não encontrado, favor verificar o Id informado" })
        }
        if (email != dadosCliente.email) {
            const emailExiste: boolean = !!await knex('clientes').select('*').where({ email: email }).first()
            if (emailExiste) {
                return res.status(409).json({ mensagem: "Não é possível prosseguir, o e-mail informado já existe em nossa base de dados!" });
            }
        }
        if (cpfFormatado != dadosCliente.cpf) {
            const cpfExiste: boolean = !!await knex('clientes').select('*').where({ cpf: cpfFormatado }).first()
            if (cpfExiste) {
                return res.status(409).json({ mensagem: "Não é possível prosseguir, o CPF informado já existe em nossa base de dados!" });
            }
        }
        next()
    } catch (erro: any) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
};

const validarCadastroDeCliente = async(req: Request, res:Response, next: NextFunction) => {
    try {
        const dadosObrigatorios = ['nome', 'cpf', 'email'];

        let cpfarray: string[] = req.body.cpf.split("")
        let cpfFormatado: string = ""
        for (let item of cpfarray) {
            if (item >= "0" && item <= "9") {
                cpfFormatado += item
            }
        }
        req.body.cpf = cpfFormatado

        let dadosOpcionais:Dict[] = [];
        for (const key in req.body){
            if(!dadosObrigatorios.includes(key)){
                dadosOpcionais.push({
                    key,
                    value: req.body[`${key}`]
                });
            }
        }
    
        for(let dado = 0; dado < dadosOpcionais.length; dado++){

            if (dadosOpcionais[dado].key == 'estado') {
                if (req.body.estado.length != 2) {
                    return res.status(400).json({ mensagem: "O estado deve ser informado no padrão de Unidade Federativa (UF)" })
                }
            }

            let cepFormatado: string = ""
        
            if (dadosOpcionais[dado].key == 'cep') {
                let cepArray: string[] = req.body.cep.split("")
                for (let item of cepArray) {
                    if (item >= "0" && item <= "9") {
                        cepFormatado += item
                    }
                }

                if (cepFormatado.length != 8) {
                    return res.status(400).json({ mensagem: "CEP inválido. verifique os dados inseridos e tente novamente!" })
                }

                let { data } = await viaCepApi.get(`/${cepFormatado}/json`)
            
                let { nome, email, numero, cpf } = req.body
                
                req.body.novoCliente = { 
                    nome: nome, email: email, cpf, 
                    cep: data.cep.replace("-", ""), 
                    rua: data.logradouro, numero: numero, bairro: data.bairro, 
                    cidade: data.localidade, estado: data.uf
                }
            }

        }

        next();

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }

};


export {
    cpfValido,
    cpfExistente,
    validaAlteracaoCliente, 
    validarCadastroDeCliente
}