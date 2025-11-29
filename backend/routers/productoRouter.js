const moongose = require("mongoose");
const express = require("express");
const Producto = require("../models/Producto");
const ProductoDestacado = require("../models/ProductoDestacado");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const productos = await Producto.find({}).populate("categoria");
    if (!productos.length)
      res.status(204).json({ message: "No hay productos" });
    res.status(200).json(productos);
  } catch (error) {
    console.error(
      "Error al obtener los productos del servidor: ",
      error.message
    );
    error.status = 400;
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const productoPeticion = req.body;

    let idProducto = productoPeticion.nombre;
    idProducto = idProducto.trim().toLowerCase().split(/\s+/).join("-");
    let coincidencias = await Producto.find({ id: idProducto });
    while (coincidencias.length) {
      idProducto = idProducto + "-" + 1;
      coincidencias = await Producto.find({ id: idProducto });
    }
    productoPeticion.id = idProducto;
    productoPeticion.link = `/productos/${idProducto}`;
    productoPeticion.alt = productoPeticion.nombre;
    const nuevoProducto = new Producto(productoPeticion);
    console.log(productoPeticion);
    await nuevoProducto.save();
    res.status(202).json(productoPeticion);
  } catch (error) {
    console.error("Error al cargar un producto al servidor: ", error.message);
    error.status = 400;
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const idProducto = req.params.id;
    const producto = await Producto.findOne({ id: idProducto }).populate(
      "categoria"
    );

    if (!producto) res.status(404).json({ message: "Producto inexistente" });

    res.status(200).json(producto);
  } catch (error) {
    console.error("Error al obtener el producto del servidor", error.message);
    error.status = 400;
    next(error);
  }
});

router.get("/:id/destacados", async (req, res, next) => {
  try {
    const idProducto = req.params.id;
    const destacados = await ProductoDestacado.find({}).populate("producto");

    if (!destacados) res.status(404).send("Productos destacados inexistentes");

    res.status(200).json(destacados);
  } catch (error) {
    console.error(
      "Error al obtener los productos destacados del servidor",
      error.message
    );
    error.status = 400;
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const idProducto = req.params.id;
    const productoEliminado = await Producto.findOneAndDelete({
      id: idProducto,
    });
    if (!productoEliminado)
      res.status(404).json({ message: "Producto inexistente" });
    res
      .status(200)
      .json({
        mensaje: "Producto eliminado con exito",
        producto: productoEliminado,
      });
  } catch (error) {
    console.error("Error al eliminar el producto del servidor", error.message);
    error.status = 400;
    next(error);
  }
});

router.put("/:id",async (req,res,next)=>{
  try {
    const idProducto = req.params.id;
    const datosActualizados = req.body;
    const productoActualizado = await Producto.findOneAndUpdate({id:idProducto}, datosActualizados, {new: true, runValidators: true}).populate("categoria");
    if(!productoActualizado){
      const error = new Error("Producto no encontrado.");
      error.status = 404;
      return next(error);
    }

    res.status(201).json({message:"Producto actualizado", producto: productoActualizado});

  } catch (error) {
    console.error("Error al actualizar el producto del servidor", error.message);
    error.status = 400; //Bad Request  -> Datos invalidos
    next(error);
  }
});

router.put("/destacar/:id", async (req, res, next)=>{
  try {
    const idProducto = req.params.id;
    const productoADestacar = await Producto.findOne({id:idProducto});
    if(!productoADestacar){
      const error = new Error("Producto no encontrado.");
      error.status = 404;
      return next(error);   
    }
    const productoActualizado = await Producto.findByIdAndUpdate(productoADestacar._id,{$set:{destacado: !productoADestacar.destacado}},{new: true}).populate("categoria");
    const mensajeFinal = productoActualizado.destacado ? "Producto destacado" : "Producto no destacado";
    res.status(201).json({message:mensajeFinal, producto: productoActualizado});

  } catch (error) {
    console.error("Error al actualizar el producto del servidor", error.message);
    error.status = 400; //Bad Request  -> Datos invalidos
    next(error);
  }
});

module.exports = router;
