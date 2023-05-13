import bcrypt from "bcrypt"
import dotenv from 'dotenv'
import knex from '../conexao'
import jwt, { Secret } from 'jsonwebtoken';
dotenv.config()

const senhaJwt: Secret = process.env.JWT_SECRET_KEY!;
// return valid token
const getValidToken = async () => {
    let usuario = await knex('usuarios').where({nome: 'teste'}).first()

    if(!usuario){
        createUser('teste', 'teste@teste.com', 'teste');
        usuario = await knex('usuarios').where({nome: 'teste'}).first()
    }

    return jwt.sign({ usuario: usuario.id }, senhaJwt, { expiresIn: "1h" })
}

const createUser = async (nome: string, email: string, senha: string ) => {
    const senhaHash: string = await bcrypt.hash(senha.toString(), 10);
    await knex('usuarios').insert({ nome, email, senha: senhaHash }).returning(['id', 'nome', 'email']);
}

export {
    getValidToken
}