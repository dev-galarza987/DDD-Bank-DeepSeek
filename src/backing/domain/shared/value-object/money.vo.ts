import type { Currency } from "./currency.vo.js";

/**
 * Objeto de valor que representa una cantidad monetaria.
 * Inmutable. Se compra por monto y moneda.
 */
export class Money {
  public readonly amount: number;
  public readonly currency: Currency;

  private constructor(amount: number, currency: Currency) {
    this.amount = amount;
    this.currency = currency;
  }

  /**
   * Crea una nueva instancia de Money.
   * @param amount - Cantidad (debe ser finita; puede ser negativa para representar deudas.).
   * @param currency - Moneda del monto.
   * @throws {Error} Si el monto no es un número finito.
   * @returns {Money} Si el monto es finito.
   */
  static create(amount: number, currency: Currency): Money {
    if (!Number.isFinite(amount)) throw new Error(`El monto deb ser un número finito. \nValue: ${amount}`);
    return new Money(amount, currency);
  }

  /**
   * Suma dos montos de la misma moneda.
   * @param other - Moneda.
   * @returns {Money} - Retorna la suma de dos montos.
   */
  add(other: Money): Money {
    this.assertSameCurrency(other);
    return Money.create(this.amount + other.amount, this.currency);
  }

  /**
   * Resta dos montos de la misma moneda.
   * @param other - Moneda.
   * @returns {Money} - Retorna la resta de dos montos.
   */
  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return Money.create(this.amount - other.amount, this.currency);
  }

  /**
   * Comprar si este monto es mayor o igual a otro.
   * @param other - Moneda.
   * @returns {Money} - Retorna true si es verdadero.
   */
  isGreaterThanOrEqual(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amount >= other.amount;
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency.equals(other.currency);
  }

  private assertSameCurrency(other: Money): void {
    if (!this.currency.equals(other.currency)) throw new Error(`No se pueden operar montos con monedas diferentes.`);
  }
}
