import 'dotenv/config';
import mysql from 'mysql2/promise';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Conectar sin especificar base de datos primero
const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
});

// Leer y ejecutar init.sql
const initSQL = fs.readFileSync(join(__dirname, '../../sql/init.sql'), 'utf8');
const statements = initSQL.split(';').filter(s => s.trim().length > 0);

for (const statement of statements) {
  if (statement.trim()) {
    await connection.query(statement);
  }
}

await connection.end();
console.log('Base de datos inicializada correctamente');

