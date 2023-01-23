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
            }
        });
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
