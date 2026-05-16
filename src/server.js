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
app.use(express.urlencoded({ extended: true }));

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

// Garante que o Render defina a porta automaticamente na nuvem
const PORT = process.env.PORT || 3000;

// CONFIGURAÇÃO CORRETA: Adicionado '0.0.0.0' para o Render conseguir conectar
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
