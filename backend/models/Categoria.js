const mongoose = require("mongoose");

const categoriaSchema = mongoose.Schema({
    nombre:{
        type:String,
        unique:true,
        required:true
    },
    imageUrl:{type: String},
    catUrl:{type: String},
    orden:{type: Number},
},{timestamp:true}
);

const Categoria = mongoose.model("Categoria",categoriaSchema);

module.exports = Categoria;