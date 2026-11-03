/**
 * Objecto de valor  que representa una moneda ISO 4217.
 * Es inmutable y se comprar por su código.
 */
export class Currency {
  public readonly code: string;

  private constructor(code: string) {
    this.code = code;
  }

  /**
   * Crea una moneda validando que el código tenga 3 letras mayúsculas.
   * @param code - Código ISO de la moneda (ej. "USD", "EUR").
   * @throws {Error} Si el código no es valido.
   * @returns {Currency} Si el código es valido.
   */
  static create(code: string): Currency {
    if (!/^[A-Z]{3}$/.test(code)) throw new Error(`Código de moneda inválido: ${code}. Debe ser ISO 4217 (3 letras mayúsculas.)`)
    return new Currency(code);
  }

  equals(other: Currency): boolean {
    return this.code === other.code;
  }
}
