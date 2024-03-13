import { Router } from "express"
import bodyParser from 'body-parser';
import User from "../models/userModel.js"
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";

const router = Router()
router.use(bodyParser.json());

// CREAR USUARIO
router.post('/', async (req, res) => {
    try {
        const { username, email, accessToken, refreshToken } = req.body;  
        const newUser = new User({ username, email, accessToken, refreshToken });
        await newUser.save();  
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
});

// Obtener datos del usuario a partir de la sesion
router.get('/me', authenticationMiddleware,  async (req, res) => {
    const user = await User.getUserById(req.user.userId)
    return res.json(user)
})

export default router