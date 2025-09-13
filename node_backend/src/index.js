const express = require('express');
const session = require('express-session');
const { initDb } = require('./db');
const ajaxRouter = require('./routes/ajax');

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

initDb();
app.use('/', ajaxRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server listening on ${PORT}`);
});
