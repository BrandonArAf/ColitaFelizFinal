import pool from '../db/pool.js';
import Usuario from '../models/Usuario.js';

export const usuarioRepository = {
  async findByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );
    return rows[0] ? new Usuario(rows[0]) : null;
  },

  async findById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE id = ?',
      [id]
    );
    return rows[0] ? new Usuario(rows[0]) : null;
  },

  async create({ nombre, email, password_hash, rol = 'VENDEDOR' }) {
    const [res] = await pool.execute(
      'INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?,?,?,?)',
      [nombre, email, password_hash, rol]
    );
    return await this.findById(res.insertId);
  }
};
