const { run, get, all } = require('../db');

async function loadList(user_id, people_id = null) {
  const params = [user_id];
  let sql = 'SELECT b.* FROM birthdates b WHERE b.user_id=?';
  if (people_id) {
    sql += ' AND b.id=?';
    params.push(people_id);
  }
  sql += ' ORDER BY b.peoplename ASC';
  const rows = await all(sql, params);
  if (!rows.length) return false;
  const paramsTags = [user_id];
  let sqlTags =
    'SELECT bt.* FROM birthdates_tags bt LEFT JOIN birthdates b ON b.id=bt.people_id WHERE b.user_id=?';
  if (people_id) {
    sqlTags += ' AND b.id=?';
    paramsTags.push(people_id);
  }
  sqlTags += ' ORDER BY bt.id ASC';
  const tagRows = await all(sqlTags, paramsTags);
  const tags = {};
  tagRows.forEach((row) => {
    if (!tags[row.people_id]) tags[row.people_id] = [];
    tags[row.people_id].push({ id: row.id, value: row.tag });
  });
  const peoples = rows.map((row) => ({
    value: row.id,
    name: row.peoplename,
    date: row.birthdate,
    tags: tags[row.id] || [],
  }));
  return { peoples };
}

async function checkOwnershipUser(id, user_id) {
  const row = await get('SELECT user_id FROM birthdates WHERE id=?', [id]);
  if (!row) return { error: true, step: 'auth1' };
  if (row.user_id !== user_id) return { error: true, step: 'auth2' };
  return { error: false };
}

async function savePeople(id, name, date, tags, user_id) {
  id = parseInt(id, 10) || 0;
  name = String(name || '').substring(0, 255);
  date = String(date || '').replace(/[^\d\.]/g, '').substring(0, 10);

  if (id) {
    const check = await checkOwnershipUser(id, user_id);
    if (check.error) return check;
  }

  const tagIds = tags
    .filter((t) => t.value !== undefined)
    .map((t) => t.value);

  const existing = await all(
    'SELECT bt.id FROM birthdates b, birthdates_tags bt WHERE b.id=bt.people_id AND b.id=? AND b.user_id=?',
    [id, user_id]
  );
  const tagIdsDB = existing.map((r) => r.id);
  const diff = tagIds.filter((t) => !tagIdsDB.includes(t));
  if (diff.length) return { error: true, step: tags };
  const toRemove = tagIdsDB.filter((t) => !tagIds.includes(t));
  if (toRemove.length)
    await run(
      `DELETE FROM birthdates_tags WHERE id IN (${toRemove
        .map(() => '?')
        .join(',')})`,
      toRemove
    );

  let insertId = id;
  if (id) {
    await run(
      'UPDATE birthdates SET peoplename=?, birthdate=?, dt_updated=CURRENT_TIMESTAMP WHERE id=?',
      [name, date, id]
    );
  } else {
    const r = await run(
      'INSERT INTO birthdates (user_id, peoplename, birthdate) VALUES (?, ?, ?)',
      [user_id, name, date]
    );
    insertId = r.lastID;
  }

  for (const tag of tags) {
    const tagText = tag.label || tag.value || '';
    if (tag.value) {
      await run('UPDATE birthdates_tags SET tag=? WHERE id=?', [tagText, tag.value]);
    } else {
      await run('INSERT INTO birthdates_tags (tag, people_id) VALUES (?, ?)', [
        tagText,
        insertId,
      ]);
    }
  }

  if (id) return { error: false };
  return { error: false, insert_id: insertId };
}

async function removePeople(id, user_id) {
  const check = await checkOwnershipUser(id, user_id);
  if (check.error) return check;
  await run('DELETE FROM birthdates WHERE id=?', [id]);
  await run('DELETE FROM birthdates_tags WHERE people_id=?', [id]);
  return { error: false };
}

async function isPeopleExists(id) {
  const row = await get('SELECT COUNT(1) cnt FROM birthdates WHERE id=?', [id]);
  return row && row.cnt !== 0;
}

async function copyPeoples(idArr, user_id) {
  for (const id of idArr) {
    if (!(await isPeopleExists(id))) continue;
    const r = await run(
      'INSERT INTO birthdates (user_id, peoplename, birthdate) SELECT ?, peoplename, birthdate FROM birthdates WHERE id=?',
      [user_id, id]
    );
    const insertId = r.lastID;
    const tagRows = await all(
      'SELECT bt.tag FROM birthdates_tags bt WHERE bt.people_id=?',
      [id]
    );
    for (const tr of tagRows) {
      await run('INSERT INTO birthdates_tags (tag, people_id) VALUES (?, ?)', [
        tr.tag,
        insertId,
      ]);
    }
  }
  return true;
}

module.exports = {
  loadList,
  savePeople,
  removePeople,
  copyPeoples,
};
