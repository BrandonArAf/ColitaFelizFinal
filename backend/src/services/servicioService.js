import { servicioRepository } from '../repositories/servicioRepository.js';

export const servicioService = {
  list: () => servicioRepository.findAll(),

  get: (id) => servicioRepository.findById(id),

  async create(dto) {
    if (!dto.id || !dto.nombre) {
      throw new Error('id y nombre son obligatorios');
    }
    return servicioRepository.create(dto);
  },

  async update(id, dto) {
    const updated = await servicioRepository.update(id, dto);
    if (!updated) throw new Error('Servicio no encontrado');
    return updated;
  },

  async delete(id) {
    const res = await servicioRepository.delete(id);
    if (!res.deleted) throw new Error('Servicio no encontrado');
    return res;
  },

  seed: (items) => servicioRepository.upsertMany(items)
};
