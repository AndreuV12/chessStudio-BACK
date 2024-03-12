import mongoose from 'mongoose'
import { DB_USER, DB_PASSWORD } from './config.js';

const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ypezsye.mongodb.net/`
mongoose.connect(URL)
.then(() => {
    console.log('Conexión exitosa a MongoDB');
})
.catch(err => console.error('Error al conectar a MongoDB:', err));