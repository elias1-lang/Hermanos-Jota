const express = require('express');
const router = express.Router();
import productos from '../data/archivoProductos';

// GET /api/productos
router.get('/', (req, res) => {
    res.status(200).json(productos);
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

module.exports = router;