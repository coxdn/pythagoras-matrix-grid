const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const crypto = require('crypto');

const DB_PATH = path.join(__dirname, '..', 'db.sqlite');
const db = new sqlite3.Database(DB_PATH);

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, function (err, row) {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, function (err, rows) {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function initDb() {
  db.serialize(async () => {
    await run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      dt_created DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    await run(`CREATE TABLE IF NOT EXISTS birthdates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL DEFAULT 1,
      peoplename TEXT NOT NULL,
      birthdate TEXT NOT NULL,
      dt_created DATETIME DEFAULT CURRENT_TIMESTAMP,
      dt_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    await run(`CREATE TABLE IF NOT EXISTS birthdates_tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tag TEXT NOT NULL,
      people_id INTEGER NOT NULL
    )`);

    const row = await get('SELECT COUNT(*) AS cnt FROM users');
    if (row.cnt === 0) {
      const user = await run('INSERT INTO users (username, password) VALUES (?, ?)', [
        'user',
        md5('user'),
      ]);
      const userId = user.lastID;

      const peoples = [
        {
          peoplename: 'Владимир Ильич Ульянов (псевдоним Ленин)',
          birthdate: '22.04.1870',
          tags: [
            'дата указана по григрианскому календарю',
            'российский революционер',
            'крупный теоретик марксизма',
          ],
        },
        {
          peoplename: 'Владимир Ильич Ульянов (псевдоним Ленин)',
          birthdate: '10.04.1870',
          tags: [
            'дата указана по юлианскому календарю',
            'российский революционер',
            'крупный теоретик марксизма',
          ],
        },
        {
          peoplename: 'Иосиф Виссарионович Сталин',
          birthdate: '09.12.1879',
          tags: [
            'настоящая фамилия Джугашвили',
            'дата по официальной версии (указана по юланскому календарю)',
            'российский революционер',
            'советский политический, государственный, военный и партийный деятель',
          ],
        },
        {
          peoplename: 'Иосиф Виссарионович Сталин',
          birthdate: '21.12.1879',
          tags: [
            'настоящая фамилия Джугашвили',
            'дата по официальной версии (указана по григорианскому календарю)',
            'российский революционер',
            'советский политический, государственный, военный и партийный деятель',
          ],
        },
        {
          peoplename: 'Стасик',
          birthdate: '16.09.1988',
          tags: ['сын маминой подруги'],
        },
      ];

      for (const p of peoples) {
        const person = await run(
          'INSERT INTO birthdates (user_id, peoplename, birthdate) VALUES (?, ?, ?)',
          [userId, p.peoplename, p.birthdate],
        );
        const peopleId = person.lastID;
        for (const tag of p.tags) {
          await run('INSERT INTO birthdates_tags (tag, people_id) VALUES (?, ?)', [
            tag,
            peopleId,
          ]);
        }
      }
    }
  });
}

module.exports = {
  db,
  run,
  get,
  all,
  initDb,
  md5,
};
