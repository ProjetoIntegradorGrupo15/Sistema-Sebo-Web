import express from 'express';

import {
    inserirLivro,
    excluirLivro,
    listarLivros,
    atualizarLivro,
    buscarLivroPorId
} from '../controllers/livroController.js';

const router = express.Router();

/* =========================
   CRUD LIVROS
========================= */

/* LISTAR TODOS OS LIVROS */
router.get('/', listarLivros);

/* BUSCAR LIVRO POR ID */
router.get('/:id', buscarLivroPorId);

/* INSERIR LIVRO */
router.post('/', inserirLivro);

/* ATUALIZAR LIVRO */
router.put('/:id', atualizarLivro);

/* EXCLUIR LIVRO */
router.delete('/:id', excluirLivro);

export default router;