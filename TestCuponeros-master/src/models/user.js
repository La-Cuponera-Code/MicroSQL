import { conexion_Digital } from '../config/database.js';
import bcrypt from 'bcrypt';


const consultarCuponeros = async () => {
  const query = 'SELECT * FROM cuponeros';
  try {
    const [rows, fields] = await conexion_Digital.query(query);
    return rows;
  } catch (error) {
    console.error('Error al consultar cuponeros:', error);
    throw error;
  }
};

 const consultarCuponeroPorEmailEnBD = async (email) => {
  const query = 'SELECT * FROM cuponeros WHERE email = ?';
  try {
    const [results] = await conexion_Digital.query(query, [email]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error('Error al consultar cuponero por email en BD:', error);
    throw error;
  }
};

const consultarCuponeroPorId = async (id) => {
  const query = 'SELECT * FROM cuponeros WHERE id = ?';
  try {
    const [rows, fields] = await conexion_Digital.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error('Error al consultar cuponero por ID:', error);
    throw error;
  }
};

const insertarCuponero = async (cuponero) => {
  const query = 'INSERT INTO cuponeros SET ?';
  try {
    await conexion_Digital.query(query, cuponero);
  } catch (error) {
    console.error('Error al insertar cuponero:', error);
    throw error;
  }
};  

const actualizarCuponero = async (id, cuponero) => {
  if (cuponero.password) {
    cuponero.password = await bcrypt.hash(cuponero.password, 10);
  }
  const query = 'UPDATE cuponeros SET ? WHERE id = ?';
  try {
    const result = await conexion_Digital.query(query, [cuponero, id]);
    return result;
  } catch (error) {
    console.error('Error al actualizar cuponero:', error);
    throw error;
  }
};

const eliminarCuponero = async (id) => {
  const query = 'DELETE FROM cuponeros WHERE id = ?';
  try {
    const result = await conexion_Digital.query(query, [id]);
    return result;
  } catch (error) {
    console.error('Error al eliminar cuponero:', error);
    throw error;
  }
};

export {
  consultarCuponeros,
  consultarCuponeroPorId,
  insertarCuponero,
  actualizarCuponero,
  eliminarCuponero, 
  consultarCuponeroPorEmailEnBD
};

