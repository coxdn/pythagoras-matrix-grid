import { get, run } from '../db/index.js';
import { md5 } from '../utils/hash.js';

export async function login(username, password) {
  const row = await get(
    'SELECT * FROM users WHERE username=? AND password=?',
    [username, md5(password)]
  );
  if (!row) return false;
  return { id: row.id, username: row.username };
}

export async function isUserExists(username) {
  const row = await get('SELECT id FROM users WHERE username=?', [username]);
  return !!row;
}

export async function register(username, password) {
  if (await isUserExists(username))
    return { error: true, message: 'USER_EXISTS' };
  if (/[^A-Za-z\d]/.test(username))
    return { error: true, message: 'FORBIDDEN_CHARS' };
  const r = await run('INSERT INTO users (username, password) VALUES (?, ?)', [
    username,
    md5(password),
  ]);
  const id = r.insertId;
  if (id)
    return { error: false, message: 'User was created', id };
  return { error: true, message: 'UNKNOWN_ERROR' };
}

export default {
  login,
  register,
};
