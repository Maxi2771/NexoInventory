import express from 'express';

const router = express.Router(); 


router.get('/', (req, res) => {
    const productos = [
        { id: 1, nombre: "Auriculares Inalambricos", categoria: "Audio", precio: 100, stock: 100 },
        { id: 2, nombre: "Smartphone", categoria: "Moviles", precio: 200, stock: 50 },
        { id: 3, nombre: "Laptop", categoria: "Computadoras", precio: 300, stock: 5 },
    ];
    res.json({ mensaje: "API de productos", status: "ok", data: productos });
});

//GET, obtener recursos
router.get('/:id', (req, res) => {
    const { id } = req.params; 
    res.json({ mensaje: "Consulta de producto por id", id });
});

//POST, crear nuevos recursos
router.post('/', (req, res) => {
    const nuevoProducto = req.body;
    res.json({ mensaje: "Producto creado", status: "ok", data: nuevoProducto });
});

//PUT, reemplazar/actualizar recursos que ya existen
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body;
    res.json({ mensaje: `Producto ${id} actualizado`, id, data });
});

//DELETE, eliminar recursos
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ mensaje: `Producto ${id} eliminado` });
});

export default router;