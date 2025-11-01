const moongose = require("mongoose");
const express = require("express");
const Producto = require("../models/Producto");

const router = express.Router();

router.get("/", async (req,res,next)=>{
    try {
        const productos = await Producto.find({}).populate("categoria");
        if(!productos.length)(res.status(204).send("No hay productos"));
        res.status(200).send(productos)
    } catch (error) {
        console.error("Error al obtener los productos del servidor: ", error.message);
        error.status = 400;
        next(error);
    }
});

router.post("/", async (req,res,next)=>{
    try {
        const productoPeticion = req.body;
        
        let idProducto = productoPeticion.nombre;
        idProducto = idProducto.trim().toLowerCase().split(/\s+/).join('-');
        let coincidencias = await Producto.find({id:idProducto});
        while(coincidencias.length){
            idProducto = idProducto+"-"+1;
            coincidencias = await Producto.find({id:idProducto});
        }
        productoPeticion.id=idProducto;
        productoPeticion.link=`/productos/${idProducto}`;
        productoPeticion.alt = productoPeticion.nombre;
        const nuevoProducto = new Producto(productoPeticion);
        console.log(productoPeticion);
        await nuevoProducto.save();
        res.status(202).send("cargado");
    } catch (error) {
        console.error("Error al cargar un producto al servidor: ", error.message);
        error.status = 400;
        next(error);
    }
});


router.get("/:id",async (req,res,next)=>{
    try {
        const idProducto = req.params.id;
        const producto = await Producto.findOne({id:idProducto});

        if(!producto)(res.status(404).send("Producto inexistente"));

        res.status(200).json(producto);

    } catch (error) {
        console.error("Error al obtener el producto del servidor",error.message);
        error.status = 400;
        next(error);
    }
});

router.delete("/:id",async (req,res,next)=>{
    try {
        const idProducto = req.params.id;
        const productoEliminado = await Producto.findOneAndDelete({id:idProducto});
        if(!productoEliminado)(res.status(404).send("Producto inexistente"));
        res.status(200).json({mensaje:"Producto eliminado con exito",producto:productoEliminado});
    } catch (error) {
        console.error("Error al eliminar el producto del servidor",error.message);
        error.status = 400;
        next(error);  
    }
})

module.exports = router;