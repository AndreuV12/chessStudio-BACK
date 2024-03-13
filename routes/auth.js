import { Router } from "express"
import jwt from "jsonwebtoken"

const secretKey = "password"
const router = Router()

router.get('/login', function (req, res) {
    const token = jwt.sign({ userId: 'andreuid' }, secretKey, { expiresIn: '1h' });
    res.json({ token });
    return
})

export default router