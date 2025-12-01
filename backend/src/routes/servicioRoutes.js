import { Router } from 'express';
import { servicioController } from '../controllers/servicioController.js';
import { authRequired, requireRole } from '../middlewares/authMiddleware.js';

const router = Router();

// Público (lista de servicios para la web)
router.get('/', servicioController.list);
router.get('/:id', servicioController.get);

// Solo ADMINISTRADOR puede gestionar servicios
router.post('/', authRequired, requireRole('ADMINISTRADOR'), servicioController.create);
router.put('/:id', authRequired, requireRole('ADMINISTRADOR'), servicioController.update);
router.delete('/:id', authRequired, requireRole('ADMINISTRADOR'), servicioController.delete);

export default router;
