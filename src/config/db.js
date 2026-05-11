import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
dotenv.config();

const db = new sqlite3.Database('./database.db', (err) => {

    if (err) {
        console.error('Erro ao conectar ao SQLite:', err.message);
    } else {
        console.log('Conectado ao SQLite com sucesso');
    }
});
/* TABELA LIVROS */
db.run(`
    CREATE TABLE IF NOT EXISTS livros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        autor TEXT NOT NULL,
        edicao TEXT,
        editora TEXT,
        ano INTEGER,
        preco REAL NOT NULL,
        disponivel TEXT NOT NULL CHECK (disponivel IN ('Sim', 'Nao'))
    )
`, (err) => {
    if (err) {
        console.error('Erro criar tabela de livros', err.message);
        } else {
        console.log('Tabela livros criada com sucesso!');
    }
});
/* TABELA USUÁRIOS */
db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        login TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
    )        
`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela usuários', err.message);
    } else {
        console.log('Tabela usuários criada com sucesso!');
    }
});


export default db;
 