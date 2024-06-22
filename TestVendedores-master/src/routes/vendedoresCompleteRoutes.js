import express from 'express';
import { obtenerVendedoresComplete, obtenerVendedorCompletePorId, crearVendedorComplete, actualizarVendedorCompletePorId, eliminarVendedorCompletePorId } from '../controllers/vendedoresCompleteController.js';

const router = express.Router();

router.get('/', obtenerVendedoresComplete);
router.get('/:id', obtenerVendedorCompletePorId);
router.post('/', crearVendedorComplete);
router.put('/:id', actualizarVendedorCompletePorId);
router.delete('/:id', eliminarVendedorCompletePorId);

export default router;
