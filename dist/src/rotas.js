"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controladores_1 = require("./controladores/controladores");
const validacoes_1 = require("./middlewares/validacoes");
const schemasJoi_1 = require("./middlewares/schemasJoi");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const rotas = express_1.default.Router();
rotas.post('/usuarios', (0, validacoes_1.validarCamposBody)(schemasJoi_1.schemaCadastroUsuario), (0, validacoes_1.emailExiste)(false), controladores_1.cadastrarUsuario);
rotas.post('/login', (0, validacoes_1.emailExiste)(true), (0, validacoes_1.validarLogin)(schemasJoi_1.schemaLogin), controladores_1.login);
rotas.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
exports.default = rotas;
