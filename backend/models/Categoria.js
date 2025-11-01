const mongoose = require("mongoose");

const categoriaSchema = mongoose.Schema({
    nombre:{
        type:String,
        unique:true,
        required:true
    }
},{timestamp:true}
);

const Categoria = mongoose.model("Categoria",categoriaSchema);

module.exports = Categoria;