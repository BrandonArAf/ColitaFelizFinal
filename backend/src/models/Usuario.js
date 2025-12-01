export default class Usuario {
  constructor(obj = {}) {
    this.id = obj.id ?? null;
    this.nombre = obj.nombre;
    this.email = obj.email;
    this.password_hash = obj.password_hash;
    this.rol = obj.rol || 'VENDEDOR';
    this.created_at = obj.created_at ?? null;
  }
}
