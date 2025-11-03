const express = require("express");

const Categoria = require("../models/Categoria");

const router = express.Router();

router.get("/", async (req,res,next)=>{
    try {
        const categorias = await Categoria.find({}).select("nombre _ID orden imageUrl catUrl").sort({orden:1});
        if(!categorias.length)(res.status(404).json({message:"No hay categorias"}));
        res.status(200).json(categorias);
    } catch (error) {
        console.error("Error al obtener las categorias de la BDD: ", error.message);
        error.status = 400;
        next(error);
    }
});


router.post("/", async (req,res,next)=>{
    try {
        let categoriaPeticion = req.body;
        categoriaPeticion.nombre = categoriaPeticion.nombre.trim().toUpperCase();
        if(!categoriaPeticion.nombre.length)(res.status(404).json({message:"El nombre no puede ser vacio"}));
        
        const cantidadOrden = await Categoria.countDocuments() + 1;
        const catNombreEstandarizado =  categoriaPeticion.nombre.trim().toUpperCase().split(/\s+/).join("-");
        
        categoriaPeticion.imageUrl = `/img/categorias/${catNombreEstandarizado}.png`;
        categoriaPeticion.catUrl = `/catalogo/${catNombreEstandarizado}/&`;
        categoriaPeticion.orden = cantidadOrden;

        const nuevaCategoria = new Categoria(categoriaPeticion);

        await nuevaCategoria.save();
        res.status(200).json({nombre:nuevaCategoria.nombre});
    } catch (error) {
        console.error("Error al cargar la categoria a la BDD: ", error.message);
        error.status = 400;
        next(error);
    }
});


module.exports = router;