import "./style.css";

import { claves } from './clavesFrecuentes';
import {
  tieneLongitudMinima,
  tienePalabrasComunes,
  tieneNombreUsuario,
  tieneMayusculasYMinusculas,
  tieneNumeros,
  tieneCaracteresEspeciales,
} from './validaciones';

export interface ValidacionClave {
  esValida: boolean;
  error?: string;
}

export const validarClave = (
  usuario: string,
  clave: string,
  comunes: string[] = claves
): ValidacionClave => {
  const validaciones = [
    () => tieneLongitudMinima(clave),
    () => tienePalabrasComunes(clave, comunes),
    () => tieneNombreUsuario(usuario, clave),
    () => tieneMayusculasYMinusculas(clave),
    () => tieneNumeros(clave),
    () => tieneCaracteresEspeciales(clave)
  ];

  for (const validacion of validaciones) {
    const resultado = validacion();
    if (!resultado.esValida) return resultado;
  }

  return { esValida: true };
};