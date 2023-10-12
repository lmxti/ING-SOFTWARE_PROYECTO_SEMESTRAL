import express, { json } from "express";
import {setupDB} from "./config/db.config.js";
import usuarioRoutes from "./api/routes/usuarioRoutes.js";
import becaRoutes from "./api/routes/becaRoutes.js";

const app = express();
const port = 3000;

app.use(json());
app.use("/api", usuarioRoutes);
app.use("/api", becaRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}, http://localhost:3000/`);
  setupDB();
});
