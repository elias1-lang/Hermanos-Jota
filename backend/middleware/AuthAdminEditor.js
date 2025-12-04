const AuthAdminEditor = (req,res,next) => {
    if(req.user && (req.user.role === "admin" || req.user.role === "editor")){
        next();
    }else{
        return res.status(403).json({ message: "No cuenta con los permisos suficientes para esta operación."});
    }
}

module.exports = AuthAdminEditor;