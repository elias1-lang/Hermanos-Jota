
const express = require('express');
const productosRoutes = require('./routes/productos');

const app = express();
const PORT = 4000;

// MIDDLEWARES
app.use(express.json());

const logger = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};
app.use(logger);


// RUTAS con express.Router
app.use('/api/productos', productosRoutes);

// RUTAS NO ENCONTRADAS
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        message: `La ruta ${req.originalUrl} no existe en este servidor`
    });
});


app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Error interno del servidor',
            timestamp: new Date().toISOString()
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});