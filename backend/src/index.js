const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Crear nuestra bd en memoria: array de productos
const productos = [
  { id: 1, nombre: "Escuadra", precio: 323.45 },
  { id: 2, nombre: "Calculadora", precio: 234.56 },
  { id: 3, nombre: "Globo Terraqueo", precio: 45.67 },
  { id: 4, nombre: "Paleta Pintura", precio: 456.78 },
  { id: 5, nombre: "Reloj", precio: 67.89 },
  { id: 6, nombre: "Agenda", precio: 78.9 },
];
 
// Crear nuestro crud de productos

// Obtener una lista de productos => GET api/productos
app.get("/api/productos", (req, res) => {
  res.send(productos);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}, http://localhost:3000/`);
});
