import pool from '../db/pool.js';
import Servicio from '../models/Servicio.js';

export const servicioRepository = {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM servicios ORDER BY nombre ASC');
    return rows.map(r => new Servicio(r));
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM servicios WHERE id = ?', [id]);
    return rows[0] ? new Servicio(rows[0]) : null;
  },

  async create(dto) {
    const svc = new Servicio(dto);
    await pool.execute(
      'INSERT INTO servicios (id, nombre, descripcion, precioDia, adicional) VALUES (?,?,?,?,?)',
      [svc.id, svc.nombre, svc.descripcion || '', svc.precioDia || 0, svc.adicional || 0]
    );
    return svc;
  },

  async update(id, dto) {
    const current = await this.findById(id);
    if (!current) return null;

    const merged = new Servicio({ ...current, ...dto, id });
    await pool.execute(
      'UPDATE servicios SET nombre = ?, descripcion = ?, precioDia = ?, adicional = ? WHERE id = ?',
      [merged.nombre, merged.descripcion, merged.precioDia, merged.adicional, id]
    );
    return merged;
  },

  async delete(id) {
    const [res] = await pool.execute('DELETE FROM servicios WHERE id = ?', [id]);
    return { deleted: res.affectedRows > 0 };
  },

  async upsertMany(items) {
    for (const it of items) {
      await pool.execute(
        `INSERT INTO servicios (id, nombre, descripcion, precioDia, adicional)
         VALUES (?,?,?,?,?)
         ON DUPLICATE KEY UPDATE
           nombre = VALUES(nombre),
           descripcion = VALUES(descripcion),
           precioDia = VALUES(precioDia),
           adicional = VALUES(adicional)`,
        [it.id, it.nombre, it.descripcion || '', it.precioDia || 0, it.adicional || 0]
      );
    }
    return true;
  }
};
