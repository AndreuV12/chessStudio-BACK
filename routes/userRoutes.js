import { Router } from "express"
import bodyParser from 'body-parser';
import User from "../models/userModel.js"
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";

const router = Router()
router.use(bodyParser.json());

// Obtener datos del usuario a partir de la sesion
router.get('/me', authenticationMiddleware,  async (req, res) => {
    const user = await User.getUserById(req.user.userId).select('-password');
    return res.json(user)
})

export default router