import {
  tieneLongitudMinima,
  tienePalabrasComunes,
  tieneNombreUsuario,
  tieneMayusculasYMinusculas,
  tieneNumeros,
  tieneCaracteresEspeciales
} from './validaciones';

describe('Validaciones de clave', () => {
  // 1. Validación de longitud
  describe('tieneLongitudMinima', () => {
    test('acepta claves de 8 o más caracteres', () => {
      expect(tieneLongitudMinima('12345678')).toEqual({ esValida: true });
      expect(tieneLongitudMinima('abcdefghij')).toEqual({ esValida: true });
    });
    test('rechaza claves más cortas de 8 caracteres', () => {
      expect(tieneLongitudMinima('1234567')).toEqual({
        esValida: false,
        error: 'La clave debe tener una longitud mínima de 8 caracteres'
      });
      expect(tieneLongitudMinima('a')).toEqual({
        esValida: false,
        error: 'La clave debe tener una longitud mínima de 8 caracteres'
      });
    });
  });

  // 2. Validación de palabras comunes
  describe('tienePalabrasComunes', () => {
    const comunes = ['password', '123456', 'admin'];
    test('rechaza si la clave es igual a una palabra común (sin distinguir mayúsculas)', () => {
      expect(tienePalabrasComunes('password', comunes)).toEqual({
        esValida: false,
        error: 'La clave no debe contener palabras comunes'
      });
      expect(tienePalabrasComunes('Admin', comunes)).toEqual({
        esValida: false,
        error: 'La clave no debe contener palabras comunes'
      });
    });
    test('acepta si no coincide con ninguna palabra común', () => {
      expect(tienePalabrasComunes('segura2025!', comunes)).toEqual({ esValida: true });
    });
  });

  // 3. Validación de nombre de usuario
  describe('tieneNombreUsuario', () => {
    const usuario = 'juanPerez';
    test('rechaza si la clave contiene el nombre de usuario (sin distinguir mayúsculas)', () => {
      expect(tieneNombreUsuario(usuario, 'juanPerez123')).toEqual({
        esValida: false,
        error: 'La clave no debe contener el nombre de usuario'
      });
      expect(tieneNombreUsuario(usuario, 'MiJuaNPERez!')).toEqual({
        esValida: false,
        error: 'La clave no debe contener el nombre de usuario'
      });
    });
    test('acepta si la clave no contiene el nombre de usuario', () => {
      expect(tieneNombreUsuario(usuario, 'claveSegura')).toEqual({ esValida: true });
    });
  });

  // 4. Validación de mayúsculas/minúsculas
  describe('tieneMayusculasYMinusculas', () => {
    test('acepta si hay al menos una mayúscula y una minúscula', () => {
      expect(tieneMayusculasYMinusculas('Abcdef')).toEqual({ esValida: true });
      expect(tieneMayusculasYMinusculas('aBc')).toEqual({ esValida: true });
    });
    test('rechaza si faltan mayúsculas o faltan minúsculas', () => {
      expect(tieneMayusculasYMinusculas('abcdef')).toEqual({
        esValida: false,
        error: 'La clave debe contener mayúsculas y minúsculas'
      });
      expect(tieneMayusculasYMinusculas('ABCDEF')).toEqual({
        esValida: false,
        error: 'La clave debe contener mayúsculas y minúsculas'
      });
    });
  });

  // 5. Validación de números
  describe('tieneNumeros', () => {
    test('acepta si hay al menos un dígito', () => {
      expect(tieneNumeros('abc1def')).toEqual({ esValida: true });
      expect(tieneNumeros('2025')).toEqual({ esValida: true });
    });
    test('rechaza si no hay dígitos', () => {
      expect(tieneNumeros('abcdef')).toEqual({
        esValida: false,
        error: 'La clave debe contener números'
      });
      expect(tieneNumeros('!@#$')).toEqual({
        esValida: false,
        error: 'La clave debe contener números'
      });
    });
  });

  // 6. Validación de caracteres especiales
  describe('tieneCaracteresEspeciales', () => {
    test('acepta si hay al menos un carácter no alfanumérico', () => {
      expect(tieneCaracteresEspeciales('abc-def')).toEqual({ esValida: true });
      expect(tieneCaracteresEspeciales('1234!')).toEqual({ esValida: true });
    });
    test('rechaza si solo hay letras y números', () => {
      expect(tieneCaracteresEspeciales('abc123')).toEqual({
        esValida: false,
        error: 'La clave debe contener caracteres especiales'
      });
      expect(tieneCaracteresEspeciales('ABCdef123')).toEqual({
        esValida: false,
        error: 'La clave debe contener caracteres especiales'
      });
    });
  });
});