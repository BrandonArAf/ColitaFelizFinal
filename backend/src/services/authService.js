import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { usuarioRepository } from '../repositories/usuarioRepository.js';

const JWT_SECRET = process.env.JWT_SECRET || 'cambia_esto_en_produccion';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '2h';

export const authService = {
  async register({ nombre, email, password, rol }) {
    const existing = await usuarioRepository.findByEmail(email);
    if (existing) throw new Error('El correo ya está registrado');

    const password_hash = await bcrypt.hash(password, 10);
    const user = await usuarioRepository.create({ nombre, email, password_hash, rol });

    return this.buildAuthResponse(user);
  },

  async login({ email, password }) {
    const user = await usuarioRepository.findByEmail(email);
    if (!user) throw new Error('Credenciales inválidas');

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new Error('Credenciales inválidas');

    return this.buildAuthResponse(user);
  },

  buildAuthResponse(user) {
    const payload = {
      sub: user.id,
      email: user.email,
      rol: user.rol
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    return {
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    };
  },

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      return null;
    }
  }
};
