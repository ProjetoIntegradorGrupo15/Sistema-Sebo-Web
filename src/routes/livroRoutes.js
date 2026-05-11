// routes/livroRoutes.js

import express from 'express';

import {
    inserirLivro,
    excluirLivro
} from '../controllers/livroController.js';

const router = express.Router();

/* INSERIR LIVRO */
router.post('/', inserirLivro);

/* EXCLUIR LIVRO */
router.delete('/:id', excluirLivro);

export default router;

