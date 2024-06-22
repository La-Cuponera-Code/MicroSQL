import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { insertarVendedor, consultarVendedorPorEmailEnBD } from '../models/Vendedores.js';

// Registrar un nuevo usuario



export const register = async (req, res) => {
  const { user_email, user_pass, user_login } = req.body;
  try {
    // Verificar si el usuario ya existe
    const existingUser = await consultarVendedorPorEmailEnBD(user_email);
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(user_pass, 10);

    // Crear un nuevo usuario
    const newUser = { user_email, user_pass: hashedPassword, user_login };
    await insertarVendedor(newUser);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Iniciar sesión
export const login = async (req, res) => {
  const { user_email, user_pass } = req.body;
  try {
    // Verificar si el usuario existe
    const user = await consultarVendedorPorEmailEnBD(user_email);
    if (!user) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(user_pass, user.user_pass);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user.id }, 'tu_secreto_jwt', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};