import { Money } from "../../shared/value-object/money.vo.js";
import { AccountId } from "../value-object/account-id.vo.js";

/**
 * Evento de dominio: Se ha habierto una nueva cuenta bancaria.
 * Representa un hecho inmutable ocurrido en el pasado.
 */
export class AccountOpenedEvent {
  public readonly eventName: string = "AccountOpened";    //---> Abstraer en Interface IEventOption
  public accountId: AccountId;
  public initialBalance: Money;
  public ocurredAt: Date;

  /**
   * Crea un evento de dominio acontecido de la apertura de un cuenta bancaria.
   * @param accountId - Idenficador único de la cuenta creada.
   * @param initialBalance - Saldo inicial de la cuenta.
   */
  constructor(accountId: AccountId, initialBalance: Money) {
    this.accountId = accountId;
    this.initialBalance = initialBalance;
    this.ocurredAt = new Date();
  }
}
