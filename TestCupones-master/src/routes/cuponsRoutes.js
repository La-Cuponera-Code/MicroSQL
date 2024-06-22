import express from 'express';
import mysql from 'mysql2/promise';

const router = express.Router();

// Configuración de la conexión a la base de datos MySQL
const pool = mysql.createPool({
  host: process.env.HOST_DIGITAL_USER,
  database: process.env.DBNAME_DIGITAL_USER,
  user: process.env.DIGITAL_USER,
  password: process.env.DIGITAL_PASS,
  port: 3306 
});

// Ruta para obtener todos los Cupones (GET)
router.get('/cupones', async (req, res) => {
  
    try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.query('SELECT * FROM cupones');

    connection.release();
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener la imagen desde MySQL:', error.message);
    res.status(500).json({ error: 'Ocurrió un error al obtener los cupones desde la base de datos.' });
  
  }
});

// Ruta para obtener un Cupon por ID (GET)
router.get('/cupones/:id', async (req, res) => {
  const id_cupon = req.params.id;
  
  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.query('SELECT * FROM cupones WHERE id_cupon = ?', [id_cupon]);
    
    connection.release();
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener la imagen desde MySQL:', error.message);
    res.status(500).json({ error: 'Ocurrió un error al obtener los cupones desde la base de datos.' });
  
  }
});

// Ruta para agregar un Cupon nuevo (PUT)
router.post('/cupones/:id', async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const discount = req.body.discount;
    const location = req.body.location; 
    const expirationDate = req.body.expirationDate;
    const createdBy = req.body.createdBy || '';
    
    const connection = await pool.getConnection();
    
    const query = 'INSERT INTO cupones ( title, description, discount, location, expirationDate, createdBy ) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await connection.execute(query, [  title, description, discount, location, expirationDate, createdBy]);
    
    connection.release();
    
    res.status(200).json({title, description, discount, location, expirationDate, createdBy  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al guardar el Cupon en la base de datos.' });
  }
});

// Ruta para actualizar la imagen del Cupon (PUT)
router.put('/cupones/:id', async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const discount = req.body.discount;
    const location = req.body.location; 
    const expirationDate = req.body.expirationDate;
    const createdBy = req.body.createdBy || '';
        
    const connection = await pool.getConnection();

    const query = 'UPDATE cupones SET title = ?, description = ?, discount = ?, location = ?, expirationDate = ?, createdBy = ?';
    
    const [result] = await connection.execute(query, [title, description, discount, location, expirationDate, createdBy]);

    connection.release();

    res.status(200).json({ title, description, discount, location, expirationDate, createdBy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar el Cupon en la base de datos.' });
  }
});


// Ruta para eliminar la imagen del Cupon por ID (DELETE)
router.delete('/cupones/:id', async (req, res) => {
  try {
    const id_cupon = req.params.id;

    const connection = await pool.getConnection();

    const query = 'DELETE FROM cupones WHERE id_vendedor = ?';
    const [result] = await connection.execute(query, [id_vendedor]);

    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cupon no encontrado para eliminar de la base de datos.' });
    }

    res.status(200).json({ message: 'Cupon eliminado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el Cupon desde la base de datos.' });
  }
});


export default router;