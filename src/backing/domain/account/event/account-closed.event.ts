import { AccountId } from "../value-object/account-id.vo.js";

/**
 * Evento de Dominio: Se ha cerrado una cuenta bancaria.
 */
export class AccountClosedEvent {
  public readonly eventName: string = 'AccountClosed';
  public readonly accountId: AccountId;
  public readonly occurredAt: Date;
  /**
   * @param accountId - ID de la cuenta cerrada.
   */
  constructor(accountId: AccountId) {
    this.accountId = accountId;
    this.occurredAt = new Date();
  }
}
