"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const knex_1 = __importDefault(require("knex"));
const { DB_CLIENT, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;
;
const knexConfig = {
    client: DB_CLIENT,
    connection: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME
    },
    ssl: { rejectUnauthorized: false }
};
exports.default = (0, knex_1.default)(knexConfig);
