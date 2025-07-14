import { ValidacionClave } from './main';

// 1. Validación de longitud
export const tieneLongitudMinima = (clave: string): ValidacionClave => 
  clave.length >= 8 
    ? { esValida: true } 
    : { esValida: false, error: "La clave debe tener una longitud mínima de 8 caracteres" };

// 2. Validación de palabras comunes
export const tienePalabrasComunes = (
  clave: string, 
  comunes: string[]
): ValidacionClave => 
  comunes.some(c => c.toLowerCase() === clave.toLowerCase())
    ? { esValida: false, error: "La clave no debe contener palabras comunes" }
    : { esValida: true };

// 3. Validación de nombre de usuario
export const tieneNombreUsuario = (
  usuario: string, 
  clave: string
): ValidacionClave => 
  usuario && clave.toLowerCase().includes(usuario.toLowerCase())
    ? { esValida: false, error: "La clave no debe contener el nombre de usuario" }
    : { esValida: true };

// 4. Validación de mayúsculas/minúsculas
export const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => 
  /[A-Z]/.test(clave) && /[a-z]/.test(clave)
    ? { esValida: true }
    : { esValida: false, error: "La clave debe contener mayúsculas y minúsculas" };

// 5. Validación de números
export const tieneNumeros = (clave: string): ValidacionClave => 
  /\d/.test(clave)
    ? { esValida: true }
    : { esValida: false, error: "La clave debe contener números" };

// 6. Validación de caracteres especiales
export const tieneCaracteresEspeciales = (clave: string): ValidacionClave => 
  /[^A-Za-z0-9]/.test(clave)
    ? { esValida: true }
    : { esValida: false, error: "La clave debe contener caracteres especiales" };