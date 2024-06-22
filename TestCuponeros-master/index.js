import express from 'express';
import cors from 'cors';
import usersRoutes from './src/routes/usersRoutes.js';
import { conexion_App, conexion_Digital } from './src/config/database.js';
import uploadLogoRoutes from './src/routes/uploadLogoRoutes.js';
import uploadPortadaRoutes from './src/routes/uploadPortadaRoutes.js';


// Configuración de Express
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/Cuponeros', usersRoutes);
app.use('/api/upload', uploadLogoRoutes, uploadPortadaRoutes);

// Mensaje de confirmación de conexión
conexion_App.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar con la base de datos de la aplicación:', err.message);
  } else {
    console.log('Conexión establecida con la base de datos de la aplicación');
    connection.release();
  } 
});

conexion_Digital.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar con la base de datos digital:', err.message);
  } else {
    console.log('Conexión establecida con la base de datos digital');
    connection.release();
  }
});


// Manejo de rutas no encontradas
app.use((req, res, next) => {
  const error = new Error('Ruta no encontrada app');
  error.status = 404;
  next(error);
});

// Manejo de errores
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});