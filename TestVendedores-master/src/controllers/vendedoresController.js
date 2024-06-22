import { isValidEmail } from '../utils/emailUtils.js'
import { consultarVendedores, consultarVendedorPorId, insertarVendedor, actualizarVendedor, eliminarVendedor, consultarVendedorPorEmailEnBD} from '../models/Vendedores.js';
import bcrypt from 'bcrypt';




// Obtener todos los vendedores
const obtenerVendedores = async (req, res) => {
  try {
    const vendedores = await consultarVendedores();
    res.json(vendedores);
  } catch (err) {
    console.error('Error al obtener vendedores:', err);
    res.status(500).send('Error interno del servidor');
  }
};

// Obtener un vendedor por ID
const obtenerVendedorPorId = async (req, res) => {
  try {
    const vendedor = await consultarVendedorPorId(req.params.id);
    if (!vendedor) {
      return res.status(404).send('Vendedor no encontrado');
    }
    res.json(vendedor);
  } catch (err) {
    console.error('Error al obtener vendedor por ID:', err);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para crear un nuevo vendedor
const crearVendedor = async (req, res) => {
  const { user_login, user_pass, user_nicename, user_email, user_url, display_name, telefono, nombreTienda, dirTiendaFisica, descripcion } = req.body;

  try {
    // Validar campos obligatorios
    if (!user_login || !user_pass || !user_email) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
    }

    // Validar formato de email
    if (!isValidEmail(user_email)) {
      return res.status(400).json({ error: 'El formato del correo electrónico es inválido' });
    }

    // Verificar si el email ya está registrado
    const existeVendedor = await consultarVendedorPorEmailEnBD(user_email);
    if (existeVendedor) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    // Generar el hash del password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user_pass, saltRounds);

    // Crear objeto del vendedor con la contraseña hasheada
    const vendedor = {
      user_login,
      user_pass: hashedPassword,
      user_nicename,
      user_email,
      user_url,
      user_registered: new Date(),
      display_name,
      telefono,
      nombreTienda,
      dirTiendaFisica,
      descripcion
    };

    // Insertar el vendedor en la base de datos
    await insertarVendedor(vendedor);

    res.status(201).json({ message: 'Vendedor creado correctamente' });
  } catch (error) {
    console.error('Error al crear vendedor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};




// Actualizar un vendedor
const actualizarVendedorPorId = async (req, res) => {
  try {
    await actualizarVendedor(req.params.id, req.body);
    res.json({ message: 'Vendedor actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar vendedor:', err);
    res.status(500).send('Error interno del servidor');
  }
};

// Eliminar un vendedor
const eliminarVendedorPorId = async (req, res) => {
  try {
    await eliminarVendedor(req.params.id);
    res.json({ message: 'Vendedor eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar vendedor:', err);
    res.status(500).send('Error interno del servidor');
  }
};

export { obtenerVendedores, obtenerVendedorPorId, crearVendedor, actualizarVendedorPorId, eliminarVendedorPorId, consultarVendedorPorEmailEnBD };
