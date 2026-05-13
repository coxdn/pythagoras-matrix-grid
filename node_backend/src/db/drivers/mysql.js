import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import config from '../../../config/index.js';
import { md5 } from '../../utils/hash.js';
import peoples from '../../../data/peoples.js';

const pool = mysql.createPool({
  host: config.db.mysql.host,
  user: config.db.mysql.user,
  password: config.db.mysql.password,
  database: config.db.mysql.database,
});

export async function run(sql, params = []) {
  const [result] = await pool.execute(sql, params);
  return result;
}

export async function get(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows[0];
}

export async function all(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

async function ensureBirthdatesTagsAuditColumns() {
  const columns = await all(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA=DATABASE()
        AND TABLE_NAME='birthdates_tags'
        AND COLUMN_NAME IN ('dt_created', 'dt_updated')`
  );
  const columnNames = columns.map((row) => String(row.COLUMN_NAME).toLowerCase());

  if (!columnNames.includes('dt_created')) {
    await run(
      'ALTER TABLE birthdates_tags ADD COLUMN dt_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP'
    );
  }

  if (!columnNames.includes('dt_updated')) {
    await run(
      'ALTER TABLE birthdates_tags ADD COLUMN dt_updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    );
  }
}

export async function initDb() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const sqlPath = path.join(__dirname, '../../../sql/mysql/init.sql');
  const initSql = fs.readFileSync(sqlPath, 'utf8');
  const statements = initSql
    .split(/;\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  for (const stmt of statements) {
    await run(stmt);
  }

  await ensureBirthdatesTagsAuditColumns();

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
