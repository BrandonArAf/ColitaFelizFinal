import { authService } from '../services/authService.js';

export function authRequired(req, res, next) {
  const header = req.headers.authorization || '';
  const [type, token] = header.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  const payload = authService.verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }

  req.user = payload;
  next();
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    const allowedRoles = roles.flat();
    if (!allowedRoles.includes(req.user.rol)) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    next();
  };
}
