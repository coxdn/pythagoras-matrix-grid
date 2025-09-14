import express from 'express';
import { login, register } from '../controllers/auth.js';
import {
  loadList,
  savePeople,
  removePeople,
  copyPeoples,
} from '../controllers/people.js';

const router = express.Router();

router.all('/ajax', async (req, res) => {
  const q = req.query;
  const data = req.body.data ? JSON.parse(req.body.data) : {};
  const access = req.session.access || false;

  if (q.logout !== undefined) {
    req.session.access = false;
    return res.json({ loggedIn: false });
  }

  if (access) {
    if (q.loadlist !== undefined) {
      const r = await loadList(access.id);
      return res.json(r);
    }
    if (q.login !== undefined) {
      return res.json({ ...access, loggedIn: true });
    }
    if (q.logout !== undefined) {
      req.session.access = false;
      return res.json({ loggedIn: false });
    }
    if (q.getCurrent !== undefined && q.HomePage === undefined) {
      return res.json({ user: access });
    }
    if (q.getCurrent !== undefined) {
      const peoples = await loadList(access.id);
      return res.json({ user: access, peoples: peoples ? peoples.peoples : [] });
    }
    if (q.save !== undefined) {
      const save = await savePeople(
        data.id,
        data.name,
        data.date,
        data.tags || [],
        access.id
      );
      if (save.error)
        return res.json({ error: save.error, step: save.step });
      const updated = await loadList(
        access.id,
        save.insert_id ? save.insert_id : data.id
      );
      return res.json({ error: false, people: updated.peoples });
    }
    if (q.remove !== undefined) {
      const r = await removePeople(data.id, access.id);
      return res.json({ error: r.error });
    }
  }

  if (!access) {
    if (q.login !== undefined) {
      if (!data.username || !data.password)
        return res.json({ loggedIn: false });
      const loginRes = await login(data.username, data.password);
      req.session.access = loginRes ? loginRes : false;
      return res.json(
        loginRes ? { ...loginRes, loggedIn: true } : { loggedIn: false }
      );
    }
    if (q.getCurrent !== undefined) {
      return res.json({ user: req.session.access });
    }
    if (q.register !== undefined) {
      const username = data.username;
      const password = data.password;
      const reg = await register(username, password);
      if (!reg.error) {
        await copyPeoples([88, 89, 90, 91, 92], reg.id);
        req.session.access = { id: reg.id, username };
        return res.json({
          ...reg,
          loggedIn: true,
          username,
          id: reg.id,
        });
      }
      return res.json(reg);
    }
  }

  res.json({ error: true });
});

export default router;
