import express, { Router } from 'express';
import { cadastrarUsuario } from './controladores/controladores';
import { emailExiste, validarCamposBody } from './middlewares/validacoes'
import { schemaCadastroUsuario } from './middlewares/schemasJoi'

const rotas: Router = express.Router();

rotas.get('/usuarios', validarCamposBody(schemaCadastroUsuario), emailExiste(false), cadastrarUsuario)

export default rotas;