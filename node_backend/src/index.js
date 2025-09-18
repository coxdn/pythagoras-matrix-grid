import express from 'express';
import session from 'express-session';
import { initDb } from './db/index.js';
import ajaxRouter from './routes/ajax.js';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

initDb().then(() => {
  app.use('/', ajaxRouter);
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`API server listening on ${PORT}`);
  });
});
