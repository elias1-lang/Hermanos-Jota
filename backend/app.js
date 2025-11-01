const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const Producto = require("./models/Producto");
const Categoria = require("./models/Categoria");

const productoRouter = require("./routers/productoRouter");
const categoriaRouter = require("./routers/categoriaRouter");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

const DB_URI = process.env.VARIABLE_DB_URI;

mongoose.connect(DB_URI)
.then(()=>console.log("Conexión a la BDD"))
.catch(err => {console.log("Error en la conexión:" + err); mongoose.disconnect();})

app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos del formulario
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Bienvenido a hermanos jota");
});

app.use("/api/productos/",productoRouter);
app.use("/api/categorias/",categoriaRouter);


app.use((req,res,next)=>{
    res.status(404).send("Página no encontrada");
});


app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("Error interno del servidor");
});

app.listen(PORT, () => {
    console.log("Servidor Escuchando el Puerto:" + PORT);
    console.log("Acceso a: http://localhost:"+ PORT);
    //console.log(process.env.VARIABLE_DB_URI); // para que no se mueste undefined, indicar que a node que debe cargar la variable de entorno: node --env-file .env app.js
});