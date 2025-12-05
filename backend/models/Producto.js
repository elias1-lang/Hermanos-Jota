const mongoose = require("mongoose");
const Categoria = require("./Categoria");

const productoSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    categoria:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categoria",
        required:true
    },
    descripcion:{
        type:String,
    },
    precio:{
        type:Number,
        required:true
    },
    stock:{
        type: Number
    },
    imageUrl:{
        type: String,
        required:true
    },
    id:{
        type: String,
        required:true,
        unique:true
    },
    alt:{
        type: String,
        required:true
    },
    link:{
        type: String,
        required:true
    },
    medidas:{type: String},
    terminacion:{type: String},
    material:{type: String},
    capacidad:{type: String},
    peso:{type: String},
    destacado:{type:Boolean, default: false},
},{/*strict:false*/ timestamps:true}); 

    //si strick:false, entonces se permine insertar campos no definidos en el esquema -> necesario, porque el archivo
    //original tenia productos con campos no existentes en otros productos.
        //importante: Cuando se crea un producto por el formulario, automáticamente se debe crear: el id y el link correspondiente -> no es tarea del usuario

const Producto = mongoose.model("Producto",productoSchema);
module.exports = Producto;