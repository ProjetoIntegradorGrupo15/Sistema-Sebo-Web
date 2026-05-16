import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import usuarioRoutes from './routes/usuarioRoutes.js';
import livroRoutes from './routes/livroRoutes.js';


dotenv.config();

const app = express();
/* __dirname */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/* PASTA PUBLIC */
app.use(express.static(
    path.join(__dirname, 'public')
));

/* ROTAS USUÁRIOS */
app.use('/usuarios', usuarioRoutes);

/* ROTAS LIVROS */
app.use('/livros', livroRoutes);
/* ROTA PRINCIPAL */
app.get('/', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'public', 'index.html')
    );
});
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import usuarioRoutes from './routes/usuarioRoutes.js';
import livroRoutes from './routes/livroRoutes.js';


dotenv.config();

const app = express();
/* __dirname */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/* PASTA PUBLIC */
app.use(express.static(
    path.join(__dirname, 'public')
));

/* ROTAS USUÁRIOS */
app.use('/usuarios', usuarioRoutes);

/* ROTAS LIVROS */
app.use('/livros', livroRoutes);
/* ROTA PRINCIPAL */
app.get('/', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'public', 'index.html')
    );
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});