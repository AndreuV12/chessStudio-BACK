import { Router } from "express"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const secretKey = "password"
const router = Router()
const andreuId = '65df97d31a9293152eee2a1b'
const andreuEmail = 'andreuvillaro12@gmail.com'
router.get('/login', function (req, res) {
    // const token = jwt.sign({ userId: andreuId }, secretKey, { expiresIn: '1h' });
    const token = jwt.sign({ userId: andreuId, email: andreuEmail }, secretKey); // NO EXPIRA
    res.json({ token });
    return
})
router.post('/login', async function (req, res) {
    const { email, password } = req.body
    const matchedUser = await User.getUserByEmail(email)
    if (!matchedUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (matchedUser.password !== password) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ userId: matchedUser.id, email }, secretKey); // NO EXPIRA
    res.json({ token });
    return
})

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();  
        const token = jwt.sign({ userId: newUser.id, email }, secretKey);
        res.status(201).json({ token, message: 'Usuario creado con éxito', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
});

export default router