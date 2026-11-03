/**
 * Excepción de Dominio: Se intenta operar sobre una cuenta que no está activa (cerrada o bloqueada).
 */
export class AccountNotActiveException extends Error {
  public readonly name: string;
  public readonly accountId: string;
  public readonly status: string;

  /**
   * @param accountId - ID de la cuenta inactiva.
   * @param status - Estado actual de la cuenta.
   */
  constructor(accountId: string, status: string) {
    super(`La cuenta ${accountId} no está activa. Estado actual: ${status}.`);
    this.name = 'AccountNotActiveException';
    this.accountId = accountId;
    this.status = status;
  }
}
