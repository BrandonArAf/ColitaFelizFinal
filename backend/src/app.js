import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swaggerDoc.js';
import servicioRoutes from './routes/servicioRoutes.js';
import registroRoutes from './routes/registroRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.json({ ok: true, name: 'colita-feliz-backend' }));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/registros', registroRoutes);

const PORT = process.env.PORT || 4001;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`[backend] http://localhost:${PORT}`));
}

export default app;
