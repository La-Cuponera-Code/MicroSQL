import { conexion_Digital } from '../config/database.js';

// Consultar todos los vendedores completos
const consultarVendedoresComplete = async () => {
  const query = 'SELECT * FROM wp_users_complete';
  try {
    const [rows, fields] = await conexion_Digital.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Consultar un vendedor completo por ID
const consultarVendedorCompletePorId = async (id) => {
  const query = 'SELECT * FROM wp_users_complete WHERE vendedor_id = ?';
  try {
    const [rows, fields] = await conexion_Digital.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Insertar un nuevo vendedor completo
const insertarVendedorComplete = async (vendedorComplete) => {
  const query = `INSERT INTO wp_users_complete (
    vendedor_id, registroFecha, estadoVerificacion, redesSociales, paginaWeb, 
    horariosTiendaFisica, representanteLegal, Nit, categorias, raiting, 
    seguidores, type, geolocalizacion
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    vendedorComplete.vendedor_id, vendedorComplete.registroFecha, vendedorComplete.estadoVerificacion, vendedorComplete.redesSociales,
    vendedorComplete.paginaWeb, vendedorComplete.horariosTiendaFisica, vendedorComplete.representanteLegal, vendedorComplete.Nit,
    vendedorComplete.categorias, vendedorComplete.raiting, JSON.stringify(vendedorComplete.seguidores), vendedorComplete.type, vendedorComplete.geolocalizacion
  ];

  try {
    const [result] = await conexion_Digital.query(query, values);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

// Actualizar un vendedor completo por ID
const actualizarVendedorComplete = async (id, vendedorComplete) => {
  const query = 'UPDATE wp_users_complete SET ? WHERE vendedor_id = ?';
  try {
    const [result] = await conexion_Digital.query(query, [vendedorComplete, id]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Eliminar un vendedor completo por ID
const eliminarVendedorComplete = async (id) => {
  const query = 'DELETE FROM wp_users_complete WHERE vendedor_id = ?';
  try {
    const [result] = await conexion_Digital.query(query, [id]);
    return result;
  } catch (error) {
    throw error;
  }
};

export {
  consultarVendedoresComplete,
  consultarVendedorCompletePorId,
  insertarVendedorComplete,
  actualizarVendedorComplete,
  eliminarVendedorComplete
};
