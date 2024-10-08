import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { conexion_App, conexion_Digital } from './src/config/database.js';
import cuponesRoutes from './src/routes/cuponsRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';
import raitingCuponsRoutes from './src/routes/raitngCuponsRoutes.js'
/* import swaggerUi from 'swagger-ui-express';
import fs from 'fs'; */


// Configuración de Express
const app = express();
const PORT = process.env.PORT || 5100;



// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());



/*   const swaggerDocumentPath = 'src/doc/Vendedores.json';
  let swaggerDocument;
  try {
    console.log('Intentando leer el archivo JSON de Swagger...');
    const rawData = fs.readFileSync(swaggerDocumentPath);
    swaggerDocument = JSON.parse(rawData);
    console.log('Archivo JSON de Swagger cargado correctamente:', swaggerDocument);
  } catch (error) {
    console.error('Error al cargar el archivo JSON de Swagger:', error);
  }
 */

// Rutas de la API
app.use('/api', cuponesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', raitingCuponsRoutes)


/* // Usar Swagger UI
if (swaggerDocument) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.error('No se pudo cargar el archivo JSON de Swagger.');
} */

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
