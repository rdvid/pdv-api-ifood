import express, { Router } from 'express';
import { listarCategorias, listarProdutos, adicionarProduto, detalharProduto, editarProduto, deletarProduto } from './controladores/produtos';
import { cadastrarUsuario, login, inspecionarUsuario, editarUsuario } from './controladores/usuarios'
import { listarClientes, detalhaCliente, deletaCliente, cadastraCliente, AlteraCadastraCliente } from './controladores/clientes';
import { emailExiste, usuarioLogado, validarCamposBody, validarLogin } from './middleware/usuario'
import { produtoExiste, categoriaExiste } from './middleware/produtos'
import { cpfValido, validaAlteracaoCliente, cpfExistente } from './middleware/clientes';
import { schemaCadastroUsuario, schemaLogin, schemaCadastroProduto, schemaCadastroCliente, schemaCadastroPedido } from './schemas/schemasJoi'
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';
import { cadastraPedido, listaPedidos } from './controladores/pedidos';
import { existeCliente_id, validaIdPedido, validaprodutos_pedido } from './middleware/pedidos';

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
rotas.post('/produto', validarCamposBody(schemaCadastroProduto), categoriaExiste, adicionarProduto)
rotas.put('/produto/:id', produtoExiste, validarCamposBody(schemaCadastroProduto), categoriaExiste, editarProduto)
rotas.delete('/produto/:id', produtoExiste, deletarProduto)
// pedido
rotas.post('/pedido', validarCamposBody(schemaCadastroPedido), existeCliente_id, validaprodutos_pedido, cadastraPedido)
rotas.get('/pedido', validaIdPedido, listaPedidos)

export default rotas;