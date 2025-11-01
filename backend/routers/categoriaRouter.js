const express = require("express");

const Categoria = require("../models/Categoria");

const router = express.Router();

router.get("/", async (req,res,next)=>{
    try {
        const categorias = await Categoria.find({}).select("nombre _ID");
        if(!categorias.length)(res.status(404).send("No hay categorias"))
        res.status(200).send(categorias);
    } catch (error) {
        console.error("Error al obtener las categorias de la BDD: ", error.message);
        error.status = 400;
        next(error);
    }
});


router.post("/", async (req,res,next)=>{
    try {
        let categoriaPeticion = req.body;
        categoriaPeticion.nombre = categoriaPeticion.nombre.trim();
        if(!categoriaPeticion.nombre.length)(res.status(404).send("El nombre no puede ser vacio"));
        const nuevaCategoria = new Categoria(categoriaPeticion);
        await nuevaCategoria.save();
        res.status(200).send("Categoria cargada");
    } catch (error) {
        console.error("Error al cargar la categoria a la BDD: ", error.message);
        error.status = 400;
        next(error);
    }
});


module.exports = router;