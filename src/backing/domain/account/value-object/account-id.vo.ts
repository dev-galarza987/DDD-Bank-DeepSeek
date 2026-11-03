/**
 * Objecto de valor que identifica de forma única una cuenta bancaria.
 * Inmutable.
 */
export class AccountId {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): AccountId {
    if (!value || value.trim().length === 0) throw new Error(`AccountId no puede estar vacío.`);
    return new AccountId(value.trim());
  }

  equals(other: AccountId): boolean {
    return this.value === other.value;
  }
}
