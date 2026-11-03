import { Money } from "../../shared/value-object/money.vo.js";
import { AccountId } from "../value-object/account-id.vo.js";
import { TransactionId } from "../value-object/transaction-id.vo.js";

/**
 * Evento de Dominio: Se ha realizado un depósito en una cuenta.
 */
export class MoneyDepositedEvent {
  public readonly eventName: string = 'MoneyDeposited';
  public readonly accountId: AccountId;
  public readonly transactionId: TransactionId;
  public readonly amount: Money;
  public readonly occurredAt: Date;

  /**
   * @param accountId - ID de la cuenta.
   * @param transactionId - ID de la transacción de depósito.
   * @param amount - Monto depositado.
   */
  constructor(accountId: AccountId, transactionId: TransactionId, amount: Money,) {
    this.accountId = accountId;
    this.transactionId = transactionId;
    this.amount = amount;
    this.occurredAt = new Date();
  }
}
