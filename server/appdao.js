const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird')
require('dotenv').config();

/*
 We're going to quickly write a wrapper function that gives us a promised version of the sqlite3 driver.
 We want to do this because by default the package uses a callback pattern (which can lead to messy code).
*/

class AppDAO {
    constructor() {
        const databaseFile = process.env.DATABASE === 'local' ? 'data-local.db' : 'data.db';

        this.db = new sqlite3.Database(databaseFile, (err) => {
            if (err) {
                console.log('Could not connect to database', err)
                return;
            }
        });

        this.db.run(`CREATE TABLE IF NOT EXISTS "usuario" (
                    "id"	INTEGER NOT NULL,
                    "nome"	TEXT NOT NULL,
                    "email"	INTEGER NOT NULL UNIQUE,
                    "senha"	INTEGER NOT NULL,
                    PRIMARY KEY("id" AUTOINCREMENT)
                )`);

        this.db.run(`CREATE TABLE IF NOT EXISTS "disciplina" (
                    "id"	INTEGER NOT NULL,
                    "nome"	TEXT NOT NULL,
                    "descricao"	TEXT NOT NULL,
                    PRIMARY KEY("id" AUTOINCREMENT)
                )`);

        this.db.run(`CREATE TABLE IF NOT EXISTS "assunto"  (
                    "id"	INTEGER NOT NULL,
                    "id_disciplina"	INTEGER NOT NULL,
                    "nome"	TEXT NOT NULL,
                    "descricao"	TEXT NOT NULL,
                    "ordem"	INTEGER NOT NULL,
                    "referencia"	TEXT NOT NULL,
                    FOREIGN KEY("id_disciplina") REFERENCES "disciplina"("id") ON DELETE CASCADE,
                    PRIMARY KEY("id" AUTOINCREMENT)
                )`);
    }


    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log('Error running sql ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve({ lastId: this.lastID })
                }
            })
        })
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

module.exports = AppDAO;
