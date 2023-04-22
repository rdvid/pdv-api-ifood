import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import rotas from './rotas';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(rotas)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.listen(port, () => {
    console.log(`port: ${port}`)
})

export default app;