/**
 * Excepción de Dominio: Se intenta retirar o transferir un monto mayor al saldo disponible.
 * Es una violación de una regla de negocio.
 */
export class InsufficientFundsException extends Error {
  public readonly name: string
  public readonly accountId: string;
  public readonly requested: number;
  public readonly available: number;

  /**
     * @param accountId - ID de la cuenta con fondos insuficientes.
     * @param requested - Monto solicitado.
     * @param available - Saldo disponible.
     */
  constructor(accountId: string, requested: number, available: number) {
    super(`Fondos insuficientes en la cuenta ${accountId}. Solicitado: ${requested}, Disponible: ${available}.`);
    this.name = "InsufficientFundsException";
    this.accountId = accountId;
    this.requested = requested;
    this.available = available;
  }
}
