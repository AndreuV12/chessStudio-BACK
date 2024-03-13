import { Router } from "express";
import bodyParser from 'body-parser';
import Opening from "../models/openingModel.js";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";

const router = Router();
router.use(bodyParser.json());

// CREAR APERTURA
router.post('/', async (req, res) => {
    try {
        const { name, shown_pos, data, email } = req.body;  
        const newOpening = new Opening({ name, shown_pos, data, email });
        await newOpening.save();  
        res.status(201).json({ message: 'Apertura creada con éxito', opening: newOpening });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la apertura' });
    }
});

// Obtener todos los openings de un usuario (autenticado a través de la sesión)
router.get('/', authenticationMiddleware, async (req, res) => {
    try {
        const email = req.user.email;
        const openings = await Opening.getUserOpenings(email);
        res.status(200).json(openings);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener openings del usuario' });
    }
});

// Obtener un opening específico por ID
router.get('/:openingId', authenticationMiddleware, async (req, res) => {
    try {
        const userEmail = req.user.email;
        const opening = await Opening.getOpeningById(req.params.openingId);
        
        if (!opening) {
            return res.status(404).json({ message: 'Apertura no encontrada' });
        }

        // Verifica que el opening pertenece al usuario que ha iniciado sesión
        if (opening.email !== userEmail) {
            return res.status(403).json({ message: 'No tienes permiso para acceder a esta apertura' });
        }
        res.status(200).json( opening );
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la apertura por ID' });
    }
});

// Editar un opening específico por ID
router.put('/:openingId', authenticationMiddleware, async (req, res) => {
    try {
        const userEmail = req.user.email;
        const openingId = req.params.openingId;
        // Verifica que el opening pertenece al usuario que ha iniciado sesión
        const opening = await Opening.getOpeningById(openingId);
        if (!opening || opening.email !== userEmail) {
            return res.status(403).json({ message: 'No tienes permiso para editar esta apertura' });
        }

        // Realiza la edición del opening
        const updatedOpening = req.body;
        const editedOpening = await Opening.editOpeningById(openingId, updatedOpening);

        res.status(200).json({ message: 'Apertura editada con éxito', opening: editedOpening });
    } catch (error) {
        res.status(500).json({ message: 'Error al editar la apertura por ID' });
    }
});

export default router;
