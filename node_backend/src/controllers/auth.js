const { get, run, md5 } = require('../db');

async function login(username, password) {
  const row = await get(
    'SELECT * FROM users WHERE username=? AND password=?',
    [username, md5(password)]
  );
  if (!row) return false;
  return { id: row.id, username: row.username };
}

async function isUserExists(username) {
  const row = await get('SELECT id FROM users WHERE username=?', [username]);
  return !!row;
}

async function register(username, password) {
  if (await isUserExists(username))
    return { error: true, message: 'USER_EXISTS' };
  if (/[^A-Za-z\d]/.test(username))
    return { error: true, message: 'FORBIDDEN_CHARS' };
  const r = await run('INSERT INTO users (username, password) VALUES (?, ?)', [
    username,
    md5(password),
  ]);
  if (r.lastID)
    return { error: false, message: 'User was created', id: r.lastID };
  return { error: true, message: 'UNKNOWN_ERROR' };
}

module.exports = {
  login,
  register,
};
