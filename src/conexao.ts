import dotenv from 'dotenv';
dotenv.config();
import knex from 'knex';
const { DB_CLIENT, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

interface DBConfig {
    client: string;
    connection: {
        host: string;
        port: string;
        user: string;
        password: string;
        database: string;
    };
    ssl: boolean
};

const knexConfig: DBConfig = {
    client: DB_CLIENT!,
    connection: {
        host: DB_HOST!,
        port: DB_PORT!,
        user: DB_USER!,
        password: DB_PASS!,
        database: DB_NAME!
    },
    ssl: true
};

export default knex(knexConfig);
