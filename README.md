# Gestor_de_Opiniones
--Levantar Proyecto
1. Agregar sus variables de entorno.
2. Instalacion dependencias:  pnpm install.
3. Creacion de contenedor Docker: docker-compose up -d.
4. Creacion de base de datos postgresSQL a base del componente docker.
5. Levantar el proyecto: pnpm run dev

-- Instrucciones de uso
1. Registrar una cuenta nueva en endpoint postman (AUTH > USERS)(re confirmacion de contraseña).
2. Verificar la cuenta (AUTH > VERIFI EMAIL)
3. Iniciar Sesion en la cuenta (AUTH > INICIAR SESION) (guardar token de authenticacion para más fucnionalidades)(5 intentos maximos de inicio de seion).
-- (opcional): Generar otra cuenta para comparaciones de seguridad futuras.
-- (opcional): cambiar contraseña por medio de token
-- (opcional): ver pefil con token propio.
-- (opcional): fallar el login 5 veces para un bloqueo de 60 segundos (loginAttemps).

(PUBLICACIONES)
1. Añadir una publicacion (PUBLICATION > ADD) llenar los campos, imagen opcional, author = usuario.
2. Obtener lista de publicaciones totales, obtener una publicacion especifica, GET.
3. Actualizar campos, no se permite actualizar el author, la imagen se puede eliminar (no acepta 2 archivos) solamente los dueños de su publicacion pueden actualizar sus datos (Token de autenticacion (Inicio de sesion)).
4. Eliminar Publicacion, no se permite elimar la publicacion sin el permiso del usuario (Token de autenticacion (Inicio de sesion)).

(COMENTARIOS)
1. Añadir un comentario (Requiere el ID de la publicación y el token de verificacion del usuario que agregara el comentario). 
-- (opcional): Agregar 2 comentarios para comparaciones futuras (2 usuarios diferentes).
2. Obtener todos los comentarios 
3. Actualizar comentario (requiere la id del comentario en la ruta endpoint)(requiere el token del usuario anidado al comentario, de lo contrario no se editara la información).
4. Eliminar comentario (requiere la id del comentario en la ruta endpoint)(requiere el token del usuario anidado al comentario, de lo contrario no se eliminara).


 