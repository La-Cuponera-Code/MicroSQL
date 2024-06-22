import express from 'express';
import { obtenerCuponeros, obtenerCuponeroPorId, crearCuponero, actualizarCuponeroPorId, eliminarCuponeroPorId } from '../controllers/userController.js';
import { login, register } from '../controllers/userAuthController.js';

const router = express.Router();

router.get('/', obtenerCuponeros);
router.get('/:id', obtenerCuponeroPorId);
router.post('/', crearCuponero);
router.put('/:id', actualizarCuponeroPorId);
router.delete('/:id', eliminarCuponeroPorId);
router.post('/register', register);
router.post('/login', login);

export default router;