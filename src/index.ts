import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import rotas from './rotas';
dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(rotas)

app.listen(port, () => {
    console.log(`port: ${port}`)
})