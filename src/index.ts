import dotenv from 'dotenv';
import express,{Request, Response} from 'express';
import cors from 'cors';
dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req:Request, res:Response):Response => {
    return res.status(200).send(`ready on`)
})

app.listen(port, () => {
    console.log(`port: ${port}`)
})