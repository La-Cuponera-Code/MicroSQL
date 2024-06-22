import { conexion_Digital } from '../config/database.js';
import bcrypt from 'bcrypt';


const consultarVendedores = async () => {
  const query = 'SELECT * FROM wp_users';
  try {
    const [rows, fields] = await conexion_Digital.query(query);
    return rows;
  } catch (error) {
    console.error('Error al consultar vendedores:', error);
    throw error;
  }
};

 const consultarVendedorPorEmailEnBD = async (email) => {
  const query = 'SELECT * FROM wp_users WHERE user_email = ?';
  try {
    const [results] = await conexion_Digital.query(query, [email]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error('Error al consultar vendedor por email en BD:', error);
    throw error;
  }
};

const consultarVendedorPorId = async (id) => {
  const query = 'SELECT * FROM wp_users WHERE id = ?';
  try {
    const [rows, fields] = await conexion_Digital.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error('Error al consultar vendedor por ID:', error);
    throw error;
  }
};

const insertarVendedor = async (vendedor) => {
  const query = 'INSERT INTO wp_users SET ?';
  try {
    await conexion_Digital.query(query, vendedor);
  } catch (error) {
    console.error('Error al insertar vendedor:', error);
    throw error;
  }
};

const actualizarVendedor = async (id, vendedor) => {
  if (vendedor.contraseña) {
    vendedor.contraseña = await bcrypt.hash(vendedor.contraseña, 10);
  }
  const query = 'UPDATE wp_users SET ? WHERE id = ?';
  try {
    const result = await conexion_Digital.query(query, [vendedor, id]);
    return result;
  } catch (error) {
    console.error('Error al actualizar vendedor:', error);
    throw error;
  }
};

const eliminarVendedor = async (id) => {
  const query = 'DELETE FROM wp_users WHERE id = ?';
  try {
    const result = await conexion_Digital.query(query, [id]);
    return result;
  } catch (error) {
    console.error('Error al eliminar vendedor:', error);
    throw error;
  }
};

export {
  consultarVendedores,
  consultarVendedorPorId,
  insertarVendedor,
  actualizarVendedor,
  eliminarVendedor, 
  consultarVendedorPorEmailEnBD
};
