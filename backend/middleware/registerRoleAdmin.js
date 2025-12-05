const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerRoleAdmin = async (req, res, next) => {
  
  if(!req.body.role){return next();}

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No estás autenticado." });
    }

    const token = authHeader.split(" ")[1];
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET); // lanza error si inválido

    req.user = decodedPayload;

    const userDatabase = await User.findById(req.user.id);
    if (!userDatabase || userDatabase.role !== "admin") {
      return res.status(403).json({ message: "No tiene los permisos suficientes para esta operación." });
    }

    next(); // si todo está ok
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

module.exports = registerRoleAdmin;