import express, { Router } from 'express';
import { cadastrarUsuario, login } from './controladores/controladores';
import { emailExiste, validarCamposBody, validarLogin } from './middlewares/validacoes'
import { schemaCadastroUsuario, schemaLogin } from './middlewares/schemasJoi'

const rotas: Router = express.Router();

rotas.post('/usuarios', validarCamposBody(schemaCadastroUsuario), emailExiste(false), cadastrarUsuario)
<<<<<<< HEAD
=======
rotas.post('/login', validarLogin(schemaLogin), emailExiste(true), login)

>>>>>>> 6a2265b2058635eaab8a455db6b4f1b41d8afbdf

export default rotas;