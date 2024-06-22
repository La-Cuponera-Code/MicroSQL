import express from 'express';
import { obtenerVendedores, obtenerVendedorPorId, crearVendedor, actualizarVendedorPorId, eliminarVendedorPorId } from '../controllers/vendedoresController.js';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.get('/', obtenerVendedores);
router.get('/:id', obtenerVendedorPorId);
router.post('/', crearVendedor);
router.put('/:id', actualizarVendedorPorId);
router.delete('/:id', eliminarVendedorPorId);
router.post('/register', register);
router.post('/login', login);

export default router;
