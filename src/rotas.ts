import express, { Router } from 'express';
import { cadastrarUsuario, login, inspecionarUsuario, editarUsuario } from './controladores/controladores';
import { emailExiste, usuarioLogado, validarCamposBody, validarLogin } from './middleware/validacoes'
import { schemaCadastroUsuario, schemaLogin } from './middleware/schemasJoi'
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';

const rotas: Router = express.Router();


rotas.post('/usuarios', validarCamposBody(schemaCadastroUsuario), emailExiste(false), cadastrarUsuario);
rotas.post('/login', emailExiste(true), validarLogin(schemaLogin), login);
rotas.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
rotas.use(usuarioLogado)
rotas.get('/usuario', inspecionarUsuario)
rotas.put('/usuario', validarCamposBody(schemaCadastroUsuario), editarUsuario)

export default rotas;