import express from 'express';
import { login, register } from '../controllers/auth.js';
import {
  loadList,
  savePeople,
  removePeople,
  copyPeoples,
} from '../controllers/people.js';
import logger from '../utils/logger.js';

const router = express.Router();

router.all('/ajax', async (req, res) => {
  const q = req.query;
  const data = req.body.data ? JSON.parse(req.body.data) : {};
  const access = req.session.access || false;
  const action = Object.keys(q).join(',') || 'unknown';
  const { password, ...safeData } = data;
  const ip = req.ip;
  logger.info(`Request: ${action}`, {
    user: access ? access.id : 'guest',
    ip,
    query: q,
    data: safeData,
  });

  try {
    if (q.logout !== undefined) {
      req.session.access = false;
      logger.info('Logout', { user: access ? access.id : 'guest', ip });
      return res.json({ loggedIn: false });
    }

    if (access) {
      if (q.loadlist !== undefined) {
        const r = await loadList(access.id);
        logger.info('Search result', {
          user: access.id,
          ip,
          count: r && r.peoples ? r.peoples.length : 0,
          success: !(r && r.error),
        });
        return res.json(r);
      }
      if (q.login !== undefined) {
        logger.info('Login status', { user: access.id, ip });
        return res.json({ ...access, loggedIn: true });
      }
      if (q.getCurrent !== undefined && q.HomePage === undefined) {
        logger.info('Get current user', { user: access.id, ip });
        return res.json({ user: access });
      }
      if (q.getCurrent !== undefined) {
        const peoples = await loadList(access.id);
        logger.info('Get current with peoples', {
          user: access.id,
          ip,
          count: peoples && peoples.peoples ? peoples.peoples.length : 0,
          success: !(peoples && peoples.error),
        });
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
        if (save.error) {
          logger.error('Save people', {
            user: access.id,
            ip,
            error: save.error,
            step: save.step,
          });
          return res.json({ error: save.error, step: save.step });
        }
        logger.info('Save people', { user: access.id, ip });
        const updated = await loadList(
          access.id,
          save.insert_id ? save.insert_id : data.id
        );
        return res.json({ error: false, people: updated.peoples });
      }
      if (q.remove !== undefined) {
        const r = await removePeople(data.id, access.id);
        if (r.error) {
          logger.error('Remove people', {
            user: access.id,
            ip,
            error: r.error,
            step: r.step,
          });
        } else {
          logger.info('Remove people', { user: access.id, ip });
        }
        return res.json({ error: r.error });
      }
    }

    if (!access) {
      if (q.login !== undefined) {
        if (!data.username || !data.password) {
          logger.info('Login attempt missing credentials', {
            ip,
            data: { username: data.username || null },
          });
          return res.json({ loggedIn: false });
        }
        const loginRes = await login(data.username, data.password);
        req.session.access = loginRes ? loginRes : false;
        logger.info('Login result', {
          username: data.username,
          success: !!loginRes,
          ip,
        });
        return res.json(
          loginRes ? { ...loginRes, loggedIn: true } : { loggedIn: false }
        );
      }
      if (q.getCurrent !== undefined) {
        logger.info('Get current user (guest)', { ip });
        return res.json({ user: req.session.access });
      }
      if (q.register !== undefined) {
        const username = data.username;
        const password = data.password;
        const reg = await register(username, password);
        logger.info('Register result', {
          username,
          success: !reg.error,
          ip,
        });
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

    logger.warn('Unknown action', { action, user: access ? access.id : 'guest', ip });
    res.json({ error: 'unknown action' });
  } catch (err) {
    logger.error('Request error', {
      action,
      user: access ? access.id : 'guest',
      ip,
      error: err.message,
      stack: err.stack,
    });
    res.status(500).json({ error: err.message });
  }
});

export default router;
