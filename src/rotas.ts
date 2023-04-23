import express, { Router } from 'express';
import { cadastrarUsuario, login, inspecionarUsuario, editarUsuario } from './controladores/controladores';
import { emailExiste, usuarioLogado, validarCamposBody, validarLogin } from './middleware/validacoes'
import { schemaCadastroUsuario, schemaLogin } from './middleware/schemasJoi'

const rotas: Router = express.Router();

rotas.post('/usuario', validarCamposBody(schemaCadastroUsuario), emailExiste(false), cadastrarUsuario)
rotas.post('/login', validarLogin(schemaLogin), emailExiste(true), login)
rotas.use(usuarioLogado)
rotas.get('/usuario', inspecionarUsuario )
rotas.put('/usuario', validarCamposBody(schemaCadastroUsuario), editarUsuario)

export default rotas;