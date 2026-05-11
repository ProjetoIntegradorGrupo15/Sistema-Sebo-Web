import db from '../config/db.js';


/* INSERIR LIVRO */
export const inserirLivro = (req, res) => {

    const {
        titulo,
        autor,
        edicao,
        editora,
        ano,
        preco,
        disponivel

    } = req.body;

    /* VALIDAÇÃO */
    if (
        !titulo ||
        !autor ||
        !edicao ||
        !editora ||
        !ano ||
        !preco
    ) { return res.status(400).json({
            mensagem: 'Preencha todos os campos'
        });
    }

    const sql = `
        INSERT INTO livros
        (   titulo,
            autor,
            edicao,
            editora,
            ano,
            preco,
            disponivel
        )

        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(sql,
        [   titulo,
            autor,
            edicao,
            editora,
            ano,
            preco,
            disponivel ? 1 : 0
        ],

        function (erro) {if (erro) {console.error(erro);return res.status(500).json({
                    mensagem: 'Erro ao cadastrar livro'
                });
            }
            res.status(201).json({mensagem: 'Livro cadastrado com sucesso',
                id: this.lastID
            });
        }
    );
};
/* EXCLUIR LIVRO */
export const excluirLivro = (req, res) => {
    const { id } = req.params;
    const sql = `
        DELETE FROM livros
        WHERE id = ?
    `;

    db.run(sql, [id], function (erro) {

        if (erro) {console.error(erro);
            return res.status(500).json({
                mensagem: 'Erro ao excluir livro'
            });
        }

        if (this.changes === 0) { return res.status(404).json({
                mensagem: 'Livro não encontrado'
            });
        }
        res.status(200).json({
            mensagem: 'Livro removido com sucesso'
        });
    });
};
