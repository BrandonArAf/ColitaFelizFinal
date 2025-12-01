import { authService } from '../services/authService.js';

export const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
      }
      const result = await authService.login({ email, password });
      res.json(result);
    } catch (e) {
      res.status(401).json({ error: e.message });
    }
  },

  register: async (req, res) => {
    try {
      const { nombre, email, password, rol } = req.body;
      if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Nombre, email y contraseña son obligatorios' });
      }
      // Los usuarios normales siempre se registran como VENDEDOR
      // Solo los administradores pueden crear otros administradores (si se implementa esa funcionalidad)
      const userRol = rol === 'ADMINISTRADOR' ? 'VENDEDOR' : (rol || 'VENDEDOR');
      const result = await authService.register({ nombre, email, password, rol: userRol });
      res.status(201).json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};
