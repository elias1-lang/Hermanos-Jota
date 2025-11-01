import productosRoutes from './routes/productos.js';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

// MIDDLEWARES
app.use(express.json());

const logger = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};
app.use(logger);

app.use(cors({ // para que no tire error No 'Access-Control-Allow-Origin'
    origin: 'http://localhost:3000', // URL de tu frontend React
    credentials: true
}));

// RUTAS con express.Router
app.use('/api/productos', productosRoutes);

// RUTAS NO ENCONTRADAS
app.use((req, res) => {
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