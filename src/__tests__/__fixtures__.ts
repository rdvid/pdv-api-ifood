import bcrypt from "bcrypt"
import dotenv from 'dotenv'
import knex from '../conexao'
import jwt, { Secret } from 'jsonwebtoken';
dotenv.config()

const senhaJwt: Secret = process.env.JWT_SECRET_KEY!;
// return valid token
const pegarTokenValido = async () => {
    let usuario = await knex('usuarios').where({ nome: 'teste' }).first()

    if (!usuario) {
        await criarUsuario('teste', 'teste@teste.com', 'teste');
        usuario = await knex('usuarios').where({ nome: 'teste' }).first()
    }

    return jwt.sign({ usuario: usuario.id }, senhaJwt, { expiresIn: "1h" })
}

const criarUsuario = async (nome: string, email: string, senha: string) => {
    const senhaHash: string = await bcrypt.hash(senha.toString(), 10);
    await knex('usuarios').insert({ nome, email, senha: senhaHash }).returning(['id', 'nome', 'email']);
}

const criaIdClienteTest = async () => {
    let cliente = await knex('clientes').where({ email: 'teste@teste.com' }).first()
    if (!cliente) {
        await cadastraClienteTeste('teste', 'teste@teste.com', '07513199965', '88030300', 'teste', '2285', 'teste', 'teste', 'TS')
        cliente = await knex('clientes').where({ email: 'teste@teste.com' }).first()
    }
    return cliente
}

const cadastraClienteTeste = async (nome: string, email: string, cpf: string, cep: string, rua: string, numero: string, bairro: string, cidade: string,
    estado: string) => {
    await knex('clientes').insert({
        nome, email, cpf, cep, rua, numero, bairro, cidade, estado
    }).returning(['id'])
}
Const geraProdutoTeste = async('produtoteste1')
const cadastraProduto = async (descricao: string, quantidade_estoque: number, valor: number, categoria_id: number) => {
    await knex('produtos').insert({ descricao, quatidade_estoque, valor, categoria_id })
}
export {
    pegarTokenValido,
    criaIdClienteTest
}