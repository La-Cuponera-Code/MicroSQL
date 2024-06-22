# La Cuponera

## Descripción general de la API:
La Cuponera es una plataforma que conecta a los usuarios con las empresas para ofrecer y utilizar cupones de descuento. La API proporciona endpoints para la gestión de cuponeros (usuarios), Vendedores (empresas) y cupones, así como funciones de geolocalización para encontrar cupones cercanos a la ubicación del usuario.

## Dependencias:
- Node.js
- Express.js
- Mysql


## Endpoints:

### Cuponeros usuarios:
- **GET api/cuponeros**: Obtiene la información de todos los cuponeros registrados.
- **POST api/cuponeros/:id**: Registra un nuevo cuponero.
- **GET api/cuponeros/:id**: Obtiene la información de un cuponero específico.
- **PUT api/cuponeros/:id**: Actualiza la información de un cuponero existente.
- **DELETE api/cuponeros/:id**: Elimina un cuponero.
- **POST api/cuponeros/login**: Loguea al usuario a su perfil.
- **POST api/cuponeros/register**: Registra a un nuevo usuario;

### Cuponeros imagenes logo:
- **POST /api/upload/logos/:id**: Registra un logo en cuponero.
- **GET /api/upload/logos/:id**: Obtiene la información de un logo específico.
- **PUT /api/upload/logos/:id**: Actualiza la información de un logo existente.
- **DELETE /api/upload/logos/:id**: Elimina un logo.
### Cuponeros imagenes Portada:
- **POST /api/upload/portadas/:id**: Registra una nueva portada en cuponero.
- **GET /api/upload/portadas/:id**: Obtiene la información de una portada específico.
- **PUT /api/upload/portadas/:id**: Actualiza la información de una portada existente.
- **DELETE /api/upload/portadas/:id**: Elimina una portada.
### Cuponeros documentacion de la API:
- **DOCUMENTACION /api/docs** : Obtiene documentacion via Swagger.

## Parámetros de solicitud:
- Para los endpoints de creación y actualización, se esperan datos en formato JSON en el cuerpo de la solicitud.

## Respuestas de la API:
- La API devuelve respuestas en formato JSON.
- Códigos de estado HTTP comunes incluyen 200 para solicitudes exitosas, 400 para solicitudes incorrectas y 500 para errores internos del servidor.

## Ejemplos de uso:
- Para obtener todos los cuponeros:

                    Respuesta:
                    ```json
                    [
                    {
                        "id": 1,
                        "nombre": "Usuario1",
                        "email": "cuponero1@example.com"
                    },
                    {
                        "id": 2,
                        "nombre": "Usuario2",
                        "email": "cuponero2@example.com"
                    }
                    ]

## Autenticación y autorización:
- Los usuarios pueden autenticarse mediante un token JWT que se envía en el encabezado de autorización.
- Algunos endpoints, como la creación y actualización de cupones, pueden requerir roles específicos para acceder.

## Envio de emial para registro y newsletter pormocinales
- La API envia de forma automatica correos de validacion de cuentas , Newslleter a los usuarios para que se mantengan al dìa mediante la herramienta **NODEMAILER**.

## Errores y manejo de excepciones:
- La API devuelve mensajes de error descriptivos en caso de solicitudes incorrectas o errores del servidor.
- Los clientes deben manejar los errores y mostrar mensajes informativos al usuario.

## Seguridad:
- La API utiliza medidas de seguridad como la validación de datos de entrada para prevenir ataques de inyección y autenticación de usuarios para proteger la información sensible.

## Ejemplos de código:

                Pfetch('https://api.lacuponera.com/cuponeros')
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));

## Herramientas de prueba:
# Swagger 
# postman
# thunder client

## Testeos
