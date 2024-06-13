# Travel Journal

## Historias de Usuario o Casos de Uso

- [x] Cómo usuario anónino puedo REGISTARME.
  - [x] POST /sign-up -> username, email, password, avatar? -> ???
  - [ ] POST /validate-register -> codigo -> *exito o fallo*

- [x] Cómo usuario registrado puedo LOGUEARME
  - [x] POST /sign-in -> username o email y contraseña -> *exito o fallo*

- [x] Cómo usuario anónimo puedo ver TODAS las PUBLICACIONES
  - [x] GET /posts -> NULL -> posts[]
  
- [x] Cómo usuario anónimo puedo ver UNA PUBLICACIÓN
  - [x] GET /posts/id_post -> NULL -> post
  
- [ ] Cómo usuario anónimo puedo la NUBE DE TAGS
  - [ ] GET /tags -> NULL -> tags[]

- [x] Cómo usuario registrado puedo CREAR un publicación
  - [x] POST /posts -> title, description, userId (token) -> id_post
  - [ ] POST /posts/:id_post/media -> media -> ???
  
- [ ] Cómo usuario registrado puedo MODIFICAR LA VISIBLIDAD de una publicación
  - [ ] PUT /posts/:id_post/visible -> NULL -> *exito o fallo*
  
- [x] Cómo usuario registrado puedo EDITAR un publicación propia
  - [x] PATCH /posts/:id_post -> title?, description? -> *exito o fallo*
  - [ ] DELETE /posts/:id_post/media/:id_media -> NULL -> *exito o fallo*
  - [ ] POST /posts/:id_post/media/:id_media -> media: { url : string} -> *exito o fallo*

- [x] Cómo usuario registrado puedo BORRAR una publicación propia
  - [x] DELETE /posts/:id_post -> null -> *exito o fallo*

- [x] Cómo usuario registrado puedo COMENTAR una publicación
  - [x] POST /posts/:id_post/comments
  
- [x] Cómo usuario registrado puedo EDITAR un comentario propio
  - [x] PUT /posts/:id_post/comments/:id_comment
  
- [x] Cómo usuario registrado puedo BORRAR un comentario propio
  - [x] DELETE /posts/:id_post/comments/:id_comment
  
- [x] Cómo usuario registrado puedo VOTAR un post
  - [x] POST /posts/:id_post/vote/:voteType? //positive || negative o usando query string ?voteType=positive || negative
  
- [x] Cómo usuario registrado puedo VER el perfil propio y de otro usuario registrado
  - [x] GET /users/:id_user
  
- [x] Cómo usuario registrado puedo EDITAR el perfil propio
  - [x] PUT /users/:id_user
  
- [x] Cómo usuario admninistrador puedo VER TODOS los usuarios
  - [x] GET /users
  
- [x] Cómo usuario admninistrador puedo BORRAR un post de otro usuario
  - [x] DELETE /users/:id_user/posts/id_post
  
- [x] Cómo usuario admninistrador puedo DESHABILITAR otro usuario
  - [x] POST /users/:id_user/disabled
  