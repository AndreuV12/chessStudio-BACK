import express from 'express';
import cors from 'cors'

import authRoutes from '../routes/auth.js'
import userRoutes from '../routes/userRoutes.js'
import openingRoutes from '../routes/openingRoutes.js'

import '../config/mongo.js' // Crea la conexión a la bd
import { PORT, ENVIRONMENT  } from '../config/config.js';

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
app.use('/', authRoutes)
app.use('/users/', userRoutes)
app.use('/openings/', openingRoutes)

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Servidor lanzado en ${PORT}`);
});

export default app