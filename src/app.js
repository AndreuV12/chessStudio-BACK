import express from 'express';
import cors from 'cors'
import session from 'express-session'

import oauthGoogleRoutes from './routes/google_oauth.js'
import userRoutes from './routes/userRoutes.js'
import openingRoutes from './routes/openingRoutes.js'

import './config/mongo.js' // Crea la conexión a la bd

const port = 3030;

const app = express();

app.use(cors({
  origin: ['http://192.168.1.120:3000', 'http://localhost:3000'],
  credentials: true
}))


app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('trust proxy', 1)

app.use(session({
  secret: "pwd",
  name: "session-cookie",
  cookie: {
      maxAge: 60*60*1000,
      httpOnly: true,
  },
  resave: false,
  saveUninitialized: false
}))

app.use('/oauth/google/', oauthGoogleRoutes)
app.use('/users/', userRoutes)
app.use('/openings/', openingRoutes)

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
