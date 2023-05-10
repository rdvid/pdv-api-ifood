import express from 'express';
import cors from 'cors';
import rotas from './rotas';
import dotenv from 'dotenv';
dotenv.config();

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(rotas)
app.listen(port, () => {
    console.log(`port: ${port}`)
})

export default app;