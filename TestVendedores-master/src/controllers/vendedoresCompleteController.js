import { consultarVendedoresComplete, consultarVendedorCompletePorId, insertarVendedorComplete, actualizarVendedorComplete, eliminarVendedorComplete } from '../models/vendedoresComplete.js';

// Obtener todos los vendedores completos
const obtenerVendedoresComplete = async (req, res) => {
  try {
    const vendedoresComplete = await consultarVendedoresComplete();
    res.json(vendedoresComplete);
  } catch (err) {
    console.error('Error al obtener vendedores completos:', err);
    res.status(500).send('Error interno del servidor');
  }
};

// Obtener un vendedor completo por ID de vendedor
const obtenerVendedorCompletePorId = async (req, res) => {
  try {
    const vendedorComplete = await consultarVendedorCompletePorId(req.params.id);
    if (!vendedorComplete) {
      return res.status(404).send('Vendedor completo no encontrado');
    }
    res.json(vendedorComplete);
  } catch (err) {
    console.error('Error al obtener vendedor completo por ID:', err);
    res.status(500).send('Error interno del servidor');
  }
};

// Crear un nuevo vendedor completo
const crearVendedorComplete = async (req, res) => {
  try {
    const vendedorCompleteId = await insertarVendedorComplete(req.body);
    res.status(201).json({ id: vendedorCompleteId });
  } catch (err) {
    console.error('Error al crear vendedor completo:', err);
    res.status(500).send('Error interno del servidor');
  }
};

// Actualizar un vendedor completo
const actualizarVendedorCompletePorId = async (req, res) => {
  try {
    await actualizarVendedorComplete(req.params.id, req.body);
    res.json({ message: 'Vendedor completo actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar vendedor completo:', err);
    res.status(500).send('Error interno del servidor');
  }
};

// Eliminar un vendedor completo
const eliminarVendedorCompletePorId = async (req, res) => {
  try {
    await eliminarVendedorComplete(req.params.id);
    res.json({ message: 'Vendedor completo eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar vendedor completo:', err);
    res.status(500).send('Error interno del servidor');
  }
};

export { obtenerVendedoresComplete, obtenerVendedorCompletePorId, crearVendedorComplete, actualizarVendedorCompletePorId, eliminarVendedorCompletePorId };
