import { Router } from "express"
import jwt from "jsonwebtoken"

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

export default router