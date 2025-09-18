import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import config from '../../../config/index.js';
import { md5 } from '../../utils/hash.js';
import peoples from '../../../data/peoples.js';

sqlite3.verbose();
const db = new sqlite3.Database(config.db.sqlite.filename);

export function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ insertId: this.lastID, changes: this.changes });
    });
  });
}

export function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

export function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

export async function initDb() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const sqlPath = path.join(__dirname, '../../../sql/sqlite/init.sql');
  const initSql = fs.readFileSync(sqlPath, 'utf8');
  const statements = initSql
    .split(/;\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  for (const stmt of statements) {
    await run(stmt);
  }

  const row = await get('SELECT COUNT(*) AS cnt FROM users');
  if (row && row.cnt === 0) {
    const user = await run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      ['user', md5('user')]
    );
    const userId = user.insertId;

    for (const p of peoples) {
      const person = await run(
        'INSERT INTO birthdates (user_id, peoplename, birthdate) VALUES (?, ?, ?)',
        [userId, p.peoplename, p.birthdate]
      );
      const personId = person.insertId;
      for (const tag of p.tags) {
        await run('INSERT INTO birthdates_tags (tag, people_id) VALUES (?, ?)', [
          tag,
          personId,
        ]);
      }
    }
  }
}
