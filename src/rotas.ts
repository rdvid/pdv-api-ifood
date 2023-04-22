import express, { Router } from 'express';
import { cadastrarUsuario, login } from './controladores/controladores';
import { emailExiste, validarCamposBody, validarLogin } from './middlewares/validacoes'
import { schemaCadastroUsuario, schemaLogin } from './middlewares/schemasJoi'
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';

const rotas: Router = express.Router();


rotas.post('/usuarios', validarCamposBody(schemaCadastroUsuario), emailExiste(false), cadastrarUsuario);
rotas.post('/login', emailExiste(true), validarLogin(schemaLogin), login);
rotas.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default rotas;