import { app } from '#lib/app'
import express from 'express'
import expressWs from 'express-ws'

import { DatabaseSync } from 'node:sqlite';

const database = new DatabaseSync('database.sqlite3');

database.exec(`
    CREATE TABLE data(
    key INTEGER PRIMARY KEY,
  ) STRICT
`)

const insert = database.prepare('INSERT INTO data (key) VALUES (?)');

expressWs(app)

const router = express.Router()

let num = 0;

router.ws('/', (ws, req) => {
    ws.send("Server Connected.");
    ws.on('message', msg => {
        //console.log(`${msg}${num}`);
        num += 1;
        insert.run(num)
    })
})

export default router