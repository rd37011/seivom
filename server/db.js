"use strict";
const sqlite3 = require('sqlite3').verbose();

class DB {
    constructor(file) {
        this.db = new sqlite3.Database(file);
        this.createUserTable();
        console.log('DB initialized!', this.db);
    }

    createUserTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS user (
                id integer PRIMARY KEY,
                name text,
                user_name text UNIQUE,
                user_pass text,
                is_admin integer)`
        return this.db.run(sql);
    }

    selectByUser(user_name, callback) {
        return this.db.get(
            `SELECT * FROM user WHERE user_name = ?`,
            [user_name],function(err,row){
                callback(err,row)
            })
    }

    insertAdmin(user, callback) {
        return this.db.run(
            'INSERT INTO user (name,user_name,user_pass,is_admin) VALUES (?,?,?,?)',
            user, (err) => {
                callback(err)
            })
    }

    selectAll(callback) {
        return this.db.all(`SELECT * FROM user`, function(err,rows){
            callback(err,rows)
        })
    }

    insert(user, callback) {
        return this.db.run(
            'INSERT INTO user (name,user_name,user_pass) VALUES (?,?,?)',
            user, (err) => {
                callback(err)
            })
    }
}

module.exports = DB

// TODO: define extra DB table for movies + operations to create, read, update, delete