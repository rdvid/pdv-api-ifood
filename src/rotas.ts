import express, { Router } from 'express';
import { cadastrarUsuario, login } from './controladores/controladores';
import { emailExiste, validarCamposBody, validarLogin } from './middlewares/validacoes'
import { schemaCadastroUsuario, schemaLogin } from './middlewares/schemasJoi'

const rotas: Router = express.Router();

rotas.post('/usuarios', validarCamposBody(schemaCadastroUsuario), emailExiste(false), cadastrarUsuario)
rotas.post('/login', validarLogin(schemaLogin), emailExiste(true), login)


export default rotas;