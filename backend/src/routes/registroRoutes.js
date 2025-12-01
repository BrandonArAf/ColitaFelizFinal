import { Router } from 'express';
import { registroController } from '../controllers/registroController.js';
import { authRequired, requireRole } from '../middlewares/authMiddleware.js';

const router = Router();

// Solo ADMINISTRADOR puede ver y gestionar registros
router.get('/', authRequired, requireRole('ADMINISTRADOR'), registroController.list);
router.post('/', authRequired, requireRole('ADMINISTRADOR'), registroController.create);
router.delete('/:id', authRequired, requireRole('ADMINISTRADOR'), registroController.delete);

export default router;
