const express = require("express");
const mongoose = require("mongoose");
const Producto = require("./models/Producto");
const Categoria = require("./models/Categoria");
const cors = require("cors");
const productoRouter = require("./routers/productoRouter");
const categoriaRouter = require("./routers/categoriaRouter");

const app = express();

const PORT = process.env.PORT || 3000;

const DB_URI = process.env.VARIABLE_DB_URI;
//para conectarse a la BDD (de necesitarse), reemplazar toda la variable process.env.VARIABLE_DB_URI
//ANTES DE HACER PULL reemplazarla con "process.env.VARIABLE_DB_URI" con la original, tal que la variable secreta no se copia al repositorio publico
//para ejecutar sin reemplazar nada, es decir con: const DB_URI = process.env.VARIABLE_DB_URI;
//crear archivo ".env", crear una variable de forma: VARIABLE_DB_URI = "[text]";
//siendo [text] la url de mongodb atlas
//luego en terminal bash: node --env-file .env app.js

app.use(cors({
  origin: "https://muebleria-hermanos-jota-k9wj.onrender.com", //la api solo permite ser consumida desde esa url -> poner "*", para que sea pueda ser consumida por cualquier sitio
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

mongoose
  .connect(DB_URI)
  .then(() => console.log("Conexión a la BDD"))
  .catch((err) => {
    console.log("Error en la conexión:" + err);
    mongoose.disconnect();
  });


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos del formulario
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Bienvenido a hermanos jota");
});

app.use("/api/productos/", productoRouter);
app.use("/api/categorias/", categoriaRouter);

app.use((req, res, next) => {
  res.status(404).send("Página no encontrada");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error interno del servidor");
});

app.listen(PORT, () => {
  console.log("Servidor Escuchando el Puerto:" + PORT);
  console.log("Acceso a: http://localhost:" + PORT);
});
