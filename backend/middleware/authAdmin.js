const authAdmin = (req,res,next) => {
    if(req.user && req.user.role == "admin"){
        next();
    }else{
        return res.status(403).json({ message: "No cuenta con los permisos suficientes para esta operación."});
    }
}

module.exports = authAdmin;