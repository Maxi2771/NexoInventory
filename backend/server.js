import express from 'express';
import cors from 'cors';
import productosRoutes from './src/routes/productos.js';

//creo instancia de express
const app = express();

//middleware para parsear json
app.use(express.json());

//habilitar CORS para todas las rutas
app.use(cors());

//rutas de productos
app.use('/productos', productosRoutes);

app.get('/', (req, res) => {
    res.send('Servidor principal funcionando');
});

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});