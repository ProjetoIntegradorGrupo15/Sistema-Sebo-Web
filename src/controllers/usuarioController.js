import db from '../config/db.js';
import bcrypt, { hash } from "bcrypt";

export const listarUsuario = (req, res) => {
    db.all('SELECT * FROM usuarios', (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao buscar usuários'});
        }
        res.json(rows);
    });
};
// INSERIR USUÁRIO (Cadastro)

export const inserirUsuario = (req, res) => {   
    const { nome, login, senha } = req.body;   
    if (!nome || !login || !senha) return res.status(400).json({erro: "Todos os campos são obrigatórios"});

   bcrypt.hash (senha,10).then((hash) => {
    const sql = `INSERT INTO usuarios (nome, login, senha) VALUES (?, ?, ?)`;
    db.run(sql, [nome, login, hash], function(err) {
        if (err) return res.status(500).json({erro: "Erro ao inserir usuário"});
        res.json({mensagem: "Usuário inserido!", id: this.lastID});
        });
    }).catch((err) => { 
        console.error(err);
        res.status(500).json({erro: "Erro ao gerar hash de senha"});
    });
};


// LOGIN

export const loginUsuario = (req, res) => {
    const { login, senha } = req.body;
    if (!login || !senha) 
        return res.status(400).json({ erro: "Login e senha obrigatórios" });

    const sql = `SELECT * FROM usuarios WHERE login = ?`;

    db.get(sql, [login], async (err, row) => {
        if (err) return res.status(500).json({ erro: "Erro ao fazer login" });
        if (!row) return res.status(401).json({ erro: "Login ou senha inválidos" });

        try {
            const valido = await bcrypt.compare(senha, row.senha); // compara senha com hash
            if (!valido) return res.status(401).json({ erro: "Login ou senha inválidos" });

            res.json({ mensagem: "Login realizado com sucesso!", usuario: row });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao validar senha" });
        }
    });
};






export const excluirUsuario = (req, res) => {
    const { id } = req.params;

    db.run(
        'DELETE FROM usuarios WHERE id = ?',
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao excluir usuário'
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    erro: 'Usuário não encontrado'
                });
            }

            res.json({
                mensagem: 'Usuário excluído com sucesso!'
            });
        }
    );
};

