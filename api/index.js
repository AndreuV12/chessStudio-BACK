import express from 'express';
import cors from 'cors'

import authRoutes from '../routes/auth.js'
import userRoutes from '../routes/userRoutes.js'
import openingRoutes from '../routes/openingRoutes.js'

import dotenv from 'dotenv'
dotenv.config()

import '../config/mongo.js' // Crea la conexión a la bd
const { PORT, ENVIRONMENT } = process.env
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: [
    'http://192.168.1.120:3000', 
    'http://localhost:3000',
    'https://chess-studio-web.vercel.app/'
  ],
  credentials: true
}))

app.get('/', (_req, res) => {
  res.send(`¡Hola, ${ENVIRONMENT}!`);
});

app.get('/env',(_req,res)=>{
  res.json(process.env)
})
app.use('/', authRoutes)
app.use('/users/', userRoutes)
app.use('/openings/', openingRoutes)

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Servidor lanzado en ${PORT}`);
});

export default app