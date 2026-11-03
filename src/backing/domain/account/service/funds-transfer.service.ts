import type { Money } from "../../shared/value-object/money.vo.js";
import type { BankAccount } from "../agregate/bank-account.aggregate.js";
import { InsufficientFundsException } from "../exception/insufficient-funds.exception.js";
import type { TransactionId } from "../value-object/transaction-id.vo.js";

/**
 * Servicio de Dominio que coordina una transferencia entre dos cuentas.
 * La lógica de negocio de una transferencia no pertenece naturalmente a una sola entidad.
 */
export class FundsTransferService {
  /**
   * Transfiere un monto de una cuenta origen a una cuenta destino.
   * @param source - Cuenta de origen.
   * @param target - Cuenta de destino.
   * @param amount - Monto a transferir.
   * @param sourceTransactionId - ID de la transacción de retiro en origen.
   * @param targetTransactionId - ID de la transacción de depósito en destino.
   * @throws {InsufficientFundsException} Si la cuenta origen no tiene fondos suficientes.
   */
  transfer(
    source: BankAccount,
    target: BankAccount,
    amount: Money,
    sourceTransactionId: TransactionId,
    targetTransactionId: TransactionId
  ): void {
    // 1. Verificar fondos en la cuenta origen (regla de negocio explícita).
    if (!source.balance.isGreaterThanOrEqual(amount)) throw new InsufficientFundsException(source.id.value, amount.amount, source.balance.amount);

    // 2. Ejecutar el retiro en origen y el depósito en destino.
    // El agregado origen validará nuevamente sus propias invariantes.
    source.withdrawal(sourceTransactionId, amount);
    target.deposit(targetTransactionId, amount);
  }
}
