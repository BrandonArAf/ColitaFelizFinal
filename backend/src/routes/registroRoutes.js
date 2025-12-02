import { Router } from 'express';
import { registroController } from '../controllers/registroController.js';
import { authRequired, requireRole } from '../middlewares/authMiddleware.js';

const router = Router();

// Lectura para ADMINISTRADOR y VENDEDOR; gestion reservada a ADMINISTRADOR
router.get('/', authRequired, requireRole(['ADMINISTRADOR', 'VENDEDOR']), registroController.list);
router.post('/', authRequired, requireRole('ADMINISTRADOR'), registroController.create);
router.delete('/:id', authRequired, requireRole('ADMINISTRADOR'), registroController.delete);

export default router;
