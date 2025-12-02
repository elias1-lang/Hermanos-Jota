const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware"); // Importamos nuestro guardia

//const userController = require("../controllers/userController"); // Importamos los controladores -> todavia no existen, no se importan

// RUTA PÚBLICA (cualquiera puede acceder)

router.post("/register", async (req, res) => {
  try {
    // 1. Recibimos los datos del formulario
    const { name, username, email, password, role} = req.body;

    // 2. Verificamos si el usuario o email ya existen
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El email o nombre de usuario ya está en uso." });
    }

    // 3. Hasheamos la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Creamos el nuevo usuario con la contraseña hasheada
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role: role,
    });

    // 5. Guardamos el usuario en la base de datos
    const savedUser = await newUser.save();

    // 6. Respondemos al frontend (sin enviar la contraseña)
    res.status(201).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      name: savedUser.name,
      role: savedUser.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    // 1. Buscamos al usuario por su email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // Usamos un mensaje genérico por seguridad
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // 2. Comparamos la contraseña enviada con la hasheada en la BD
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // 3. Si las credenciales son correctas, generamos el JWT
    const token = jwt.sign(
      { id: user._id, name:user.name, username: user.username, email: user.email, role: user.role }, // Payload: datos que queremos en el token
      process.env.JWT_SECRET, // La clave secreta desde .env
      { expiresIn: "1h" } // Opciones (ej: expira en 1 hora)
    );

    // 4. Respondemos con el token y datos del usuario (sin el password)
    res.status(200).json({
      token,
      user: { //podría quitarse y que solo se acceda con la decodificacion del payload
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
      },
    });
    // en vez de enviar un JSON con el token
    // res.cookie('authToken', token, {
    // httpOnly: true, // ¡La clave! El navegador no permite que JS la lea.
    // secure: process.env.NODE_ENV === 'production', // Enviar solo sobre HTTPS en producción
    // sameSite: 'strict', // Protección extra contra CSRF
    // maxAge: 3600000 // 1 hora de vida
    // }).json({ user: { /* ... */ }});
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// RUTA PROTEGIDA (solo usuarios con un JWT válido pueden acceder)

router.get("/profile", authMiddleware, async (req,res)=>{
  try {
      const userData = req.user; //se obtiene la información del usuario que el middleware asignó cuando verifico token (token ok) {id:_id,name,username,iat(creado),exp(expira)}
      if(!userData){return res.status(400).json({ message: "Error en los datos del token"})};
      const user = await User.findById(userData.id); //userData.id es el ObjectID del documento de usuario
      if(!user){return res.status(404).json({ message: "Error en la captura de recursos"})};

      res.status(200).json({message:"Token Verificado", user:user, //Devuelve la contraseña hasheada, se deja porque se está probando...
        token: req.headers.authorization, tokenPayload: userData
      }); 

  } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.put("/change/password", authMiddleware, async (req,res) => { //para que un usuario cambie la contraseña
  try {
    const userData = req.user;
    const {previousPassword, newPassword} = req.body; //debe enviar la peticion solo la contraseña vieja y la nueva
    if(!userData){return res.status(400).json({ message: "Error en los datos del token"})};
    if(!previousPassword|| !newPassword || !previousPassword.trim().length || !newPassword.trim().length){ return res.status(400).json({ message: "Error, la contraseña no puede ser nula."})};
    
    const user = await User.findById(userData.id);
    if(!user){return res.status(404).json({ message: "Error en la captura de recursos"})};

    const isValidPassword = await bcrypt.compare(previousPassword,user.password);

    if(!isValidPassword){ return res.status(400).json({ message: "Credenciales inválidas" })};
    
    //hay que hashear la contraseña nueva para subirla a la bdd:
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword,salt);

    const usuarioActualizado = await User.findByIdAndUpdate(user._id,{ $set:{password:hashedPassword, passwordChangedAt: new Date()} },{ new: true }); //fecha para despues ver si invalidar tokens de fecha anterior a la de cambio de contraseña

    res.status(200).json({message:"Contraseña Actualizada",user:usuarioActualizado}); //devuelve contraseña hasheada, cambiar despues...

  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.put("/change/data",authMiddleware, async (req,res)=>{ //para que un usuario cambie cualquier otro dato que no sea la contraseña
  try {
    const userDate = req.user;
    let {newName, newEmail, newUsername} = req.body;

    const user = await User.findById(userDate.id);
    if(!user){return res.status(404).json({ message: "Error en la captura de recursos"})};
    
    newName = !newName.length?user.name:newName;
    newEmail = !newEmail.length?user.email:newEmail;
    newUsername = !newUsername.length?user.username:newUsername;

    const usuarioActualizado = await User.findByIdAndUpdate(user._id,{ $set:{name:newName, email: newEmail, username:newUsername} },{ runValidators: true, new: true });

    res.status(200).json({message:"Datos actualizados",user:usuarioActualizado}); //devuelve contraseña hasheada, cambiar despues...

  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});



//RUTAS SOLO PARA EL ADMINISTRADOR

router.get("/",async (req,res,next)=>{ //agregar middleware de comprobacion de token administrador
  try {

      const users = await User.find({}).select("_id name username email role");

      if(!users.length){
        const error = new Error("No hay usuarios registrados");
        error.status = 404;
        return next(error);
      }

      res.status(200).json(users);

  } catch (error) {
      error.status = 400;
      error.message = "Error al obtener los usuarios del servidor";
      next(error);
  }
});

router.delete("/:username", async (req,res,next)=>{ //agregar middleware de comprobacion de token administrador -> ver si existe forma de comprobar si se trata de un mismo usuario a si mismo y permitir eliminar
  try {
      const usernameDelete = req.params.username;
      const user = await User.findOneAndDelete({username: usernameDelete}).select("_id name username email role");
      
      if(!user){
        return res.status(404).json({message:"Usuario no encontrado."});
      }

      res.status(200).json({message:"Usuario eliminado correctamente.", usuario:user});

  } catch (error) {
      error.status = 400;
      error.message = "Error al eliminar al usuario del servidor.";
      next(error);
  }
});

router.put("/change/password/:username",async (req,res,next)=>{ //asignar contraseña a un perfil solo si se es administrador
  try {
      const usernameUpdate = req.params.username;
      const newPassword = req.body.newPassword;
      if(!newPassword || !newPassword.trim().length){return res.status(400).json({message:"La nueva contraseña no puede ser nula."})}
      
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword,salt);

      const userUpdate = await User.findOneAndUpdate({username: usernameUpdate},{$set:{password: hashedNewPassword, passwordChangedAt: new Date()}},{new: true}).select("_id name username email role");

      if(!userUpdate){return res.status(404).json({message:"Usuario no encontrado."})};

      res.status(200).json({message:"Contraseña actualizada", user:userUpdate});

  } catch (error) {
      error.status = 400;
      error.message = "Error al cambiar la contraseña del usuario.";
      next(error);
  }
});

router.put("/change/data/:username",async (req,res,next)=>{ //asignar datos a un perfil solo si se es administrador

  try {
    const usernameUpdate = req.params.username;
    let {newName, newEmail, newUsername, newRole, newPassword} = req.body;

    const user = await User.findOne({username:usernameUpdate});
    if(!user){return res.status(404).json({ message: "Error en la captura de recursos"})};
    
    newName = !newName.length?user.name:newName;
    newEmail = !newEmail.length?user.email:newEmail;
    newUsername = !newUsername.length?user.username:newUsername;
    newRole = !newRole.length?user.role:newRole;

    if(newPassword.length && !(await bcrypt.compare(newPassword,user.password))){
        const salt = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(newPassword,salt);
    }else{newPassword=user.password};

    const usuarioActualizado = await User.findByIdAndUpdate(user._id,{ $set:{name:newName, email: newEmail, username:newUsername, role:newRole, password:newPassword} },{ runValidators: true, new: true }).select("_id name username email role");

    res.status(200).json({message:"Datos actualizados",user:usuarioActualizado}); //devuelve contraseña hasheada, cambiar despues...

  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
