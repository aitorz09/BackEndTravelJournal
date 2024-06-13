import express from "express";
import path from 'path';

import parseToken from "./src/middlewares/parse-token.js";

import cors from 'cors';

import { postsRoutes, authRoutes, usersRoutes, tagsRoutes } from './src/routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_FOLDER = path.join(process.cwd(), "public")

app.use(express.json());

app.use(cors());

/* recursos estáticos */
app.use(express.static(PUBLIC_FOLDER));

/* middleware que analiza el token y agrega al request los datos del usuario */
app.use(parseToken);

/* enrutadores */
app.use("/posts", postsRoutes); //rutas de publicaciones
app.use("/auth", authRoutes); //rutas de autenticación
app.use("/users", usersRoutes); //rutas de usuarios
app.use("/tags", tagsRoutes); //rutas de usuarios

app.use((req, res) => {
  return res.status(404).json({
    ok: false,
    error: "Endpoint no encontrado",
  });
})

app.use((error, req, res, next) => {
  return res.status(error.status || 500).json({
    ok: false,
    error: error.message,
  });
});

app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
