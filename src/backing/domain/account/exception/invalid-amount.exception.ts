/**
 * Excepción de Dominio: El monto proporcionado no cumple las reglas (ej. negativo, cero).
 */
export class InvalidAmountException extends Error {
  public readonly name: string;
  public readonly reason: string;

  /**
   * @param reason - Descripción de por qué el monto es inválido.
   */
  constructor(reason: string) {
    super(`Monto inválido: ${reason}`);
    this.reason = reason;
    this.name = 'InvalidAmountException';
  }
}
