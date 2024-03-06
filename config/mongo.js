import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: './config/.env' })

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const URL = `mongodb+srv://andreuvillaro12:${password}@cluster0.ypezsye.mongodb.net/`
mongoose.connect(URL)
.then(() => {
    console.log('Conexión exitosa a MongoDB');
})
.catch(err => console.error('Error al conectar a MongoDB:', err));