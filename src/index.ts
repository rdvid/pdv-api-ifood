import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import knex from './conexao'
dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', async (req: Request, res: Response): Promise<express.Response<any, Record<string, any>>> => {
    const consulta = await knex('categorias').select('*')
    return res.status(200).send(consulta)
    //return res.status(200).send(`ready on`)
})

app.listen(port, () => {
    console.log(`port: ${port}`)
})