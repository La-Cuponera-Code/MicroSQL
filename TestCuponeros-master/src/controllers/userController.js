import { isValidEmail } from '../utils/emailUtils.js'
import { consultarCuponeros, consultarCuponeroPorId, insertarCuponero, actualizarCuponero, eliminarCuponero, consultarCuponeroPorEmailEnBD} from '../models/user.js';
import bcrypt from 'bcrypt';


// Obtener todos los cuponeros
const obtenerCuponeros = async (req, res) => {
  try {
    const cuponeros = await consultarCuponeros();
    res.json(cuponeros);
  } catch (err) {
    console.error('Error al obtener cuponeros:', err);
    res.status(500).send('Error interno del servidor');
  }
};



// Obtener un cuponero por ID
const obtenerCuponeroPorId = async (req, res) => {
  try {
    const cuponero = await consultarCuponeroPorId(req.params.id);
    if (!cuponero) {
      return res.status(404).send('Cuponero no encontrado');
    }
    res.json(cuponero);
  } catch (err) {
    console.error('Error al obtener cuponero por ID:', err);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para crear un nuevo cuponero
const crearCuponero = async (req, res) => {
  const { id, nombre, apellido, email, password, estadoVerificacion, tokenValidacion } = req.body;
  

  try {
    // Validar campos obligatorios
    if (!password || !email) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
    }

    // Validar formato de email
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'El formato del correo electrónico es inválido' });
    }

    // Verificar si el email ya está registrado
    const existeCuponero = await consultarCuponeroPorEmailEnBD(email);
    if (existeCuponero) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    // Generar el hash del password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear objeto del cuponero con la contraseña hasheada
    const cuponero = {
        id,
        nombre,
        apellido,
        email,
        password: hashedPassword,
        registroFecha : new Date(),
        estadoVerificacion,
        tokenValidacion
    };

    // Insertar el cuponero en la base de datos
    await insertarCuponero(cuponero);

    res.status(201).json({ message: 'Cuponero creado correctamente' });
  } catch (error) {
    console.error('Error al crear cuponero:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Actualizar un cuponero
const actualizarCuponeroPorId = async (req, res) => {
  try {
    await actualizarCuponero(req.params.id, req.body);
    res.json({ message: 'Cuponero actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar cuponero:', err);
    res.status(500).send('Error interno del servidor');
  }
};

// Eliminar un cuponero
const eliminarCuponeroPorId = async (req, res) => {
  try {
    await eliminarCuponero(req.params.id);
    res.json({ message: 'Cuponero eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar cuponero:', err);
    res.status(500).send('Error interno del servidor');
  }
};

export { obtenerCuponeros, obtenerCuponeroPorId, crearCuponero, actualizarCuponeroPorId, eliminarCuponeroPorId, consultarCuponeroPorEmailEnBD };