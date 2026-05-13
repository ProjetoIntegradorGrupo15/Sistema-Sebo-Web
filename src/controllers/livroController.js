import db from '../config/db.js';

/* =========================
   INSERIR LIVRO
========================= */
export const inserirLivro = (req, res) => {
 console.log(req.body);
    const {
        titulo,
        autor,
        edicao,
        editora,
        ano,
        isbn,
        preco,
        disponivel,
        categoria
    } = req.body;

    /* VALIDAÇÃO */
    if (
        !titulo ||
        !autor ||
        !edicao ||
        !editora ||
        !ano ||
        !isbn ||
        !preco ||
        !categoria
    ) {
        return res.status(400).json({
            mensagem: 'Preencha todos os campos obrigatórios'
        });
    }

    const sql = `
        INSERT INTO livros (
            titulo,
            autor,
            edicao,
            editora,
            ano,
            isbn,
            preco,
            disponivel,
            categoria
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [
            titulo,
            autor,
            edicao,
            editora,
            ano,
            isbn,
            preco,
            disponivel,
            categoria
        ],
        function (erro) {

            if (erro) {
                console.error(erro);

                return res.status(500).json({
                    mensagem: 'Erro ao cadastrar livro'
                });
            }

            res.status(201).json({
                mensagem: 'Livro cadastrado com sucesso',
                id: this.lastID
            });
        }
    );
};

/* =========================
   LISTAR LIVROS
========================= */
export const listarLivros = (req, res) => {

    const sql = `
        SELECT *
        FROM livros
        ORDER BY id DESC
    `;

    db.all(sql, [], (erro, livros) => {

        if (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar livros'
            });
        }

        res.status(200).json(livros);
    });
};

/* =========================
   BUSCAR LIVRO POR ID
========================= */
export const buscarLivroPorId = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM livros
        WHERE id = ?
    `;

    db.get(sql, [id], (erro, livro) => {

        if (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao buscar livro'
            });
        }

        if (!livro) {
            return res.status(404).json({
                mensagem: 'Livro não encontrado'
            });
        }

        res.status(200).json(livro);
    });
};

/* =========================
   ATUALIZAR LIVRO
========================= */
export const atualizarLivro = (req, res) => {

    const { id } = req.params;

    const {
        titulo,
        autor,
        edicao,
        editora,
        ano,
        isbn,
        preco,
        disponivel,
        categoria
    } = req.body;

    /* VALIDAÇÃO */
    if (
        !titulo ||
        !autor ||
        !edicao ||
        !editora ||
        !ano ||
        !isbn ||
        !preco ||
        !categoria
    ) {
        return res.status(400).json({
            mensagem: 'Preencha todos os campos obrigatórios'
        });
    }

    const sql = `
        UPDATE livros
        SET
            titulo = ?,
            autor = ?,
            edicao = ?,
            editora = ?,
            ano = ?,
            isbn = ?,
            preco = ?,
            disponivel = ?,
            categoria = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [
            titulo,
            autor,
            edicao,
            editora,
            ano,
            isbn,
            preco,
            disponivel ? 1 : 0,
            categoria,
            id
        ],
        function (erro) {

            if (erro) {
                console.error(erro);

                return res.status(500).json({
                    mensagem: 'Erro ao atualizar livro'
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    mensagem: 'Livro não encontrado'
                });
            }

            res.status(200).json({
                mensagem: 'Livro atualizado com sucesso'
            });
        }
    );
};

/* =========================
   EXCLUIR LIVRO
========================= */
export const excluirLivro = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM livros
        WHERE id = ?
    `;

    db.run(sql, [id], function (erro) {

        if (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao excluir livro'
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                mensagem: 'Livro não encontrado'
            });
        }

        res.status(200).json({
            mensagem: 'Livro removido com sucesso'
        });
    });
};