import express, { Router } from 'express';
import { cadastrarUsuario, login, inspecionarUsuario, editarUsuario, listarCategorias, cadastraCliente } from './controladores/controladores';
import { emailExiste, usuarioLogado, validarCamposBody, validarLogin, cpfExiste } from './middleware/validacoes'
import { schemaCadastroUsuario, schemaLogin, schemaCadastroCliente } from './middleware/schemasJoi'
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';

const rotas: Router = express.Router();

rotas.post('/usuario', validarCamposBody(schemaCadastroUsuario), emailExiste(false), cadastrarUsuario);
rotas.post('/login', emailExiste(true), validarLogin(schemaLogin), login);
rotas.get('/categoria', listarCategorias)
rotas.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
rotas.use(usuarioLogado)
rotas.get('/usuario', inspecionarUsuario)
rotas.put('/usuario', validarCamposBody(schemaCadastroUsuario), emailExiste(false), editarUsuario)
rotas.post('/cliente', validarCamposBody(schemaCadastroCliente), emailExiste(false), cpfExiste(false), cadastraCliente)
export default rotas;