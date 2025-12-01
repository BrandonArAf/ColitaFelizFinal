-- Script para actualizar los roles de usuarios existentes
-- De ADMIN/STAFF a ADMINISTRADOR/VENDEDOR/CLIENTE

USE colita_feliz;

-- Primero, actualizar los datos existentes en la tabla usuarios
UPDATE usuarios SET rol = 'ADMINISTRADOR' WHERE rol = 'ADMIN';
UPDATE usuarios SET rol = 'VENDEDOR' WHERE rol = 'STAFF';

-- Luego, modificar la estructura de la tabla para usar los nuevos valores ENUM
ALTER TABLE usuarios
  MODIFY rol ENUM('ADMINISTRADOR','VENDEDOR','CLIENTE') NOT NULL DEFAULT 'VENDEDOR';

