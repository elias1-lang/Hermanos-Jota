import productos from '../data/archivoProductos.js';
import productosDestacados from '../data/archivoProductosDestacados.js';
import principalesCategorias from '../../client/src/data/principalesCategorias.js';
import express from 'express';

const router = express.Router();

// GET /api/productos
router.get('/', (req, res) => {
    res.status(200).json(productos);
});

router.get('/categorias', (req, res) => { //antes de /api/productos/:id para que no piense que es un id
    res.status(200).json(principalesCategorias);
});

// GET /api/productos/:id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const producto = productos.find(p => p.id === id);
    if (producto) {
        res.status(200).json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});


router.get('/:id/destacados', (req, res) => {
    const { id } = req.params;
    const destacados = productosDestacados.filter((producto) => producto !== id);

    const destacadosCompletos = destacados.map(destacado => {
        return productos.find(p => p.id === destacado);
    });
    res.status(200).json(destacadosCompletos);
});



export default router;