const User = require("../models/User");

const authRole = async (req,res,next) => { //Para evitar que un usuario con rol desactualizados realice cambios por token viejo.
    try {
        const userPayloadData = req.user;
        const userDatabase = await User.findById(userPayloadData.id);
        if(!userDatabase){return res.status(403).json({ message: "Se perdió el acceso al recurso." });}
        if(userPayloadData.role !== userDatabase.role){return res.status(403).json({ message: "Se perdió el acceso al recurso." });}
        next(); //si continua los datos del payload son los correctos.
    } catch (error) {
        next(error);
    }
}

module.exports = authRole;