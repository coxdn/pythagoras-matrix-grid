import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  db: {
    driver: process.env.DB_DRIVER || 'sqlite',
    sqlite: {
      filename: path.join(__dirname, '..', 'data', 'db.sqlite'),
    },
    mysql: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'birthdates',
    },
  },
};
