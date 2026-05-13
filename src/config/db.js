import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FORÇA RAIZ DO PROJETO (não depende de src/config)
const dbPath = path.resolve(process.cwd(), 'database.db');

console.log("🔥 BANCO USADO REALMENTE EM:", dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro SQLite:', err.message);
    } else {
        console.log('✔ Banco conectado');
    }
});




db.run(`
    CREATE TABLE IF NOT EXISTS livros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        autor TEXT NOT NULL,
        edicao TEXT,
        editora TEXT,
        ano INTEGER,
        isbn TEXT,
           categoria TEXT NOT NULL CHECK (
            categoria IN (
                'Aventura',
                'Biografia',
                'Didático',
                'Fantasia',
                'Ficção',
                'Romance',
                'Suspense',
                'Terror',
                'Outros'
            )
        ),

        preco REAL NOT NULL,

        disponivel INTEGER NOT NULL CHECK(disponivel IN ('Sim', 'Não'))
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
 