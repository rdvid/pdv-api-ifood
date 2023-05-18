import dotenv from 'dotenv';
dotenv.config();
import knex from 'knex';
import aws from 'aws-sdk';
const { DB_CLIENT, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, ENDPOINT_S3, KEY_ID, APP_KEY } = process.env;

export const endpoint = new aws.Endpoint(`${ENDPOINT_S3}`)

interface DBConfig {
    client: string;
    connection: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
        // ssl: {
        //     rejectUnauthorized?: boolean;
        // };
    };
}

const knexConfig: DBConfig = {
    client: DB_CLIENT!,
    connection: {
        host: DB_HOST!,
        port: Number(DB_PORT!),
        user: DB_USER!,
        password: DB_PASS!,
        database: DB_NAME!,
        // ssl: {
        //     rejectUnauthorized: false,
        // },
    },
};

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: `${KEY_ID}`,
        secretAccessKey: `${APP_KEY}`
    }
})

const knexSetup = knex(knexConfig)

export {
    knexSetup,
    s3
}   
    