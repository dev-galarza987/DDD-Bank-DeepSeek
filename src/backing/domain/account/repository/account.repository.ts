import type { BankAccount } from "../agregate/bank-account.aggregate.js";
import type { AccountId } from "../value-object/account-id.vo.js";

/**
 * Interfaz del Repositorio para el agregado BankAccount.
 * Define el contrato de persistencia, pero no se implementa aquí (sin infraestructura).
 */
export interface AccountRepository {
  /**
     * Busca una cuenta por su ID.
     * @param id - Identificador de la cuenta.
     * @returns La cuenta encontrada o `null` si no existe.
     */
  findById(id: AccountId): Promise<BankAccount | null>;

  /**
     * Guarda una cuenta (persiste su estado actual).
     * @param account - Cuenta a guardar.
     */
  save(account: BankAccount): Promise<void>;
}
