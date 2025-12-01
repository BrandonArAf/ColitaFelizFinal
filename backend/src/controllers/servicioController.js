import { servicioService } from '../services/servicioService.js';

export const servicioController = {
  list: async (_req, res) => {
    const items = await servicioService.list();
    res.json(items);
  },

  get: async (req, res) => {
    const item = await servicioService.get(req.params.id);
    if (!item) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(item);
  },

  create: async (req, res) => {
    try {
      const created = await servicioService.create(req.body);
      res.status(201).json(created);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await servicioService.update(req.params.id, req.body);
      res.json(updated);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  delete: async (req, res) => {
    try {
      const deleted = await servicioService.delete(req.params.id);
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};
