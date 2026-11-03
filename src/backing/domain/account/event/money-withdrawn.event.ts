import { Money } from "../../shared/value-object/money.vo.js";
import { AccountId } from "../value-object/account-id.vo.js";
import { TransactionId } from "../value-object/transaction-id.vo.js";

/**
 * Evento de Dominio: Se ha realizado un retiro de una cuenta.
 */
export class MoneyWithdrawnEvent {
  public readonly eventName: string = 'MoneyWithdrawn';
  public readonly accountId: AccountId;
  public readonly transactionId: TransactionId;
  public readonly amount: Money;
  public readonly occurredAt: Date;

  /**
   * @param accountId - ID de la cuenta.
   * @param transactionId - ID de la transacción de retiro.
   * @param amount - Monto retirado.
   */
  constructor(accountId: AccountId, transactionId: TransactionId, amount: Money,) {
    this.accountId = accountId;
    this.transactionId = transactionId;
    this.amount = amount;
    this.occurredAt = new Date();
  }
}
