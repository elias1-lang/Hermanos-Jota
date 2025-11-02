const mongoose = require("mongoose");
const Producto = require("./Producto");

const productoDestacadoSchema = mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
  },
  { timestamp: true }
);

const ProductoDestacado = mongoose.model(
  "ProductoDestacado",
  productoDestacadoSchema
);

module.exports = ProductoDestacado;
