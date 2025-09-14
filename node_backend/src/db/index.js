import config from '../../config/index.js';

const driver = await import(`./drivers/${config.db.driver}.js`);

export const run = driver.run;
export const get = driver.get;
export const all = driver.all;
export const initDb = driver.initDb;
