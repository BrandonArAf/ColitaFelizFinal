import 'dotenv/config';
import pool from '../db/pool.js';
import bcrypt from 'bcryptjs';

const usuarios = [
  {
    nombre: 'Administrador',
    email: 'admin@colitafeliz.com',
    password: 'admin123',
    rol: 'ADMINISTRADOR'
  },
  {
    nombre: 'Vendedor',
    email: 'vendedor@colitafeliz.com',
    password: 'vendedor123',
    rol: 'VENDEDOR'
  }
];

for (const usuario of usuarios) {
  const password_hash = await bcrypt.hash(usuario.password, 10);
  
  await pool.execute(
    `INSERT INTO usuarios (nombre, email, password_hash, rol) 
     VALUES (?, ?, ?, ?) 
     ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), password_hash=VALUES(password_hash), rol=VALUES(rol)`,
    [usuario.nombre, usuario.email, password_hash, usuario.rol]
  );
  
  console.log(`Usuario creado/actualizado: ${usuario.email} (${usuario.rol})`);
}

console.log('Usuarios seed OK');
process.exit(0);

