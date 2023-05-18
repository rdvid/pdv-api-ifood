import express, { Router } from 'express';
import { listarCategorias, listarProdutos, adicionarProduto, detalharProduto, editarProduto, deletarProduto } from './controladores/produtos';
import { cadastrarUsuario, login, inspecionarUsuario, editarUsuario } from './controladores/usuarios'
import { listarClientes, detalhaCliente, deletaCliente, cadastraCliente, AlteraCadastraCliente } from './controladores/clientes';
import { emailExiste, usuarioLogado, validarCamposBody, validarLogin } from './middleware/usuario'
import { produtoExiste, categoriaExiste, verificaValor } from './middleware/produtos'
import { cpfValido, validaAlteracaoCliente, cpfExistente } from './middleware/clientes';
import { listarImagens, cadastrarImagem, deletarImagem } from './controladores/arquivos'
import { schemaCadastroUsuario, schemaLogin, schemaCadastroProduto, schemaCadastroCliente } from './schemas/schemasJoi'
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';

const rotas: Router = express.Router();

rotas.post('/usuario', validarCamposBody(schemaCadastroUsuario), emailExiste(false, 'usuarios'), cadastrarUsuario);
rotas.post('/login', emailExiste(true, 'usuarios'), validarLogin(schemaLogin), login);
rotas.get('/categoria', listarCategorias)
rotas.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
rotas.use(usuarioLogado)
rotas.get('/usuario', inspecionarUsuario)
rotas.put('/usuario', validarCamposBody(schemaCadastroUsuario), emailExiste(false, 'usuarios'), editarUsuario)
//cliente
rotas.post('/cliente', validarCamposBody(schemaCadastroCliente), emailExiste(false, 'clientes'), cpfValido, cpfExistente(false), cadastraCliente)
rotas.put('/cliente/:id', validarCamposBody(schemaCadastroCliente), cpfValido, validaAlteracaoCliente, AlteraCadastraCliente)
rotas.get('/cliente', listarClientes)
rotas.get('/cliente/:id', detalhaCliente)
rotas.delete('/cliente/:id', deletaCliente)
//criar , listar
rotas.get('/produto', listarProdutos)
rotas.get('/produto/:id', produtoExiste, detalharProduto)
rotas.post('/produto', validarCamposBody(schemaCadastroProduto), categoriaExiste, verificaValor, adicionarProduto)
rotas.put('/produto/:id',produtoExiste, validarCamposBody(schemaCadastroProduto), categoriaExiste,  verificaValor, editarProduto)
rotas.delete('/produto/:id', produtoExiste, deletarProduto)
//upload
rotas.get('/arquivos', listarImagens)
rotas.post('/arquivo/upload', cadastrarImagem)

rotas.delete('/arquivo/deletar', deletarImagem)
export default rotas;