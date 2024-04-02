[Descargar PDF TP-5 ](ERD userpasteleria TP5.pdf);

--------------------------------------------------------------------------------------------------------------------
# Sistema de Gestión de "Pastelería Dulce Delicia"

Este sistema proporciona funcionalidades para administrar empleados y tortas.

### UserModel

El UserModel proporciona métodos para administrar empleados en la pastelería.

#### Métodos disponibles:

- `readUser()`: Lee todos los empleados registrados en la pastelería.
- `createUser(objUser)`: Crea un nuevo empleado en la pastelería.
- `readUserByEmail(email)`: Busca un empleado por su email.
- `updateUser(objUser)`: Actualiza la información de un empleado existente.
- `deleteUser(username)`: Elimina un empleado de la pastelería.
- `login(objUser)`: Genera un token de seguridad para el usuario.
- `logout(username)`: Cierra sesión para el usuario especificado por parametros.

### CackesModel

El CackesModel proporciona métodos para administrar tortas (cackes) en la pastelería.

#### Métodos disponibles:

- `getAllCackes(query)`: Obtiene todos las tortas registradas en la pastelería,incluyendo su busqueda por "cacke" o "size" (torta o tamaño).
- `createCackes(objUser)`: Crea una nueva torta en la pastelería.
- `readUserById(id)`: Busca una torta por su id.
- `updateCacke(objUser)`: Actualiza la información de una torta existente.
- `deleteCacke(id)`: Elimina una torta de la pastelería por su id pasado por parametros.

## Uso de la función `login()`

Para acceder a la base de datos "pasteleria.json" y ejecutar el model `CackesModel`, primero necesitas autentificarte generando un token de seguridad mediante la función `login()`. 

 Si el usuario se autentifica correctamente, puedes ejecutar el model CackesModel para administrar las tortas .de lo contrario te respondera con un error.








