import type { Money } from "../../shared/value-object/money.vo.js";
import type { TransactionId } from "../value-object/transaction-id.vo.js";

/**
 * Entidad que representa una transacción individual dentro de una cuenta.
 * Tiene identidad propia (TransactionId) y un ciclo de vida dentro del agregado.
 * Es inmutable una vez creada.
 */
export class Transaction {
  private readonly id: TransactionId;
  private readonly type: TransactionTypeOption;
  private readonly amount: Money;
  private readonly timestamp: Date;

  private constructor(id: TransactionId, type: TransactionTypeOption, amount: Money, timestamp: Date) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.timestamp = new Date();
  }

  /**
   * Crea una transacción de depósito.
   * @param id Identificador único de la transacción.
   * @param amount Monto depositado.
   * @returns Nueva instancia de Transaction.
   */
  static createDeposit(id: TransactionId, amount: Money): Transaction {
    return new Transaction(id, "DEPOSIT", amount, new Date());
  }

  /**
   * Crea una transacción de retiro.
   * @param id Identificador único de la transacción.
   * @param amount Monto depositado.
   * @returns Nueva instancia de Transaction.
   */
  static createWithdrawal(id: TransactionId, amount: Money): Transaction {
    return new Transaction(id, "WITHDRAWAL", amount, new Date());
  }

  equals(other: Transaction): boolean {
    return this.id.equals(other.id);
  }
}

type TransactionTypeOption = "DEPOSIT" | "WITHDRAWAL";

