# Gestor_de_Opiniones
• Instrucciones de uso
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

 