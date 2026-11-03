/*
 * Objeto de valor que identifica de forma única una transacción.
 * Inmutable.
 */
export class TransactionId {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Crea un TransactionId a partir de una cadena no vacía.
   * @param value - TransactionId.
   * @returns {TransactionId} - TransactionId.
   */
  static create(value: string): TransactionId {
    if (!value || value.trim().length === 0) throw new Error(`TransactionId no puede estar vacío.`);
    return new TransactionId(value.trim());
  }

  equals(other: TransactionId): boolean {
    return this.value === other.value;
  }
}
