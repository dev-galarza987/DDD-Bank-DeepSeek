import type { Money } from "../../shared/value-object/money.vo.js";
import { Transaction } from "../entity/transaction.entity.js";
import { AccountClosedEvent } from "../event/account-closed.event.js";
import { MoneyDepositedEvent } from "../event/money-deposited.event.js";
import { MoneyWithdrawnEvent } from "../event/money-withdrawn.event.js";
import { AccountNotActiveException } from "../exception/account-not-active.exception.js";
import { InsufficientFundsException } from "../exception/insufficient-funds.exception.js";
import { InvalidAmountException } from "../exception/invalid-amount.exception.js";
import type { AccountId } from "../value-object/account-id.vo.js";
import type { TransactionId } from "../value-object/transaction-id.vo.js";

type AccountStatus = "ACTIVE" | "CLOSED";

/**
 * Raíz del Agregado `BankAccount`.
 * Es la única puerta de entrada para modificar el estado de la cuenta.
 * Mantiene las invariantes: no se puede retirar más del saldo, no se opera sobre cuentas cerradas, etc.
 * Acumula eventos de dominio que pueden ser publicados externamente.
 */
export class BankAccount {
  public readonly id: AccountId;
  private _status: AccountStatus = "ACTIVE";
  private _balance: Money;
  private readonly _transactions: Transaction[] = [];
  private readonly _domainEvents: unknown[] = []; //---> Tipar los event domain.

  private constructor(id: AccountId, balance: Money) {
    this.id = id;
    this._balance = balance;
    // --------> FALTA CODE HERE <-----------
  }

  /**
   * Fábrica estática para abrir una nueva cuenta.
   * @param id - Identificador único de la cuenta.
   * @param initialBalance - Saldo inicial (debe ser mayor o igual a cero).
   * @returns Nueva instancia de BankAccount.
   * @throws {InvalidAmountException} Si el saldo inicial es negativo.
   */
  static open(id: AccountId, initialBalance: Money): BankAccount {
    if (initialBalance.amount < 0) throw new InvalidAmountException("El saldo inicial no puede ser negativo.");
    return new BankAccount(id, initialBalance);
  }

  get balance(): Money {
    return this._balance;
  }

  get status(): AccountStatus {
    return this.status;
  }

  get transactions(): ReadonlyArray<Transaction> {
    return [...this._transactions];
  }

  get domainEvents(): ReadonlyArray<unknown> { //---> Tipar Events Domain
    return [...this._domainEvents];
  }

  /**
     * Realiza un depósito en la cuenta.
     * @param transactionId - ID de la transacción.
     * @param amount - Monto a depositar (debe ser positivo).
     * @throws {InvalidAmountException} Si el monto es menor o igual a cero.
     * @throws {AccountNotActiveException} Si la cuenta no está activa.
     */
  deposit(trannsactionId: TransactionId, amount: Money): void {
    this.ensureActive();
    if (amount.amount <= 0) throw new InvalidAmountException("El monto del deposito debe ser mayor que cero.");
    this._balance = this._balance.add(amount);
    const transaction = Transaction.createDeposit(trannsactionId, amount);
    this._transactions.push(transaction);
    this.recordEvent(new MoneyDepositedEvent(this.id, trannsactionId, amount));
  }

  /**
     * Realiza un retiro de la cuenta.
     * @param transactionId - ID de la transacción.
     * @param amount - Monto a retirar (debe ser positivo y no superar el saldo).
     * @throws {InvalidAmountException} Si el monto es menor o igual a cero.
     * @throws {AccountNotActiveException} Si la cuenta no está activa.
     * @throws {InsufficientFundsException} Si el saldo es insuficiente.
     */
  withdrawal(trannsactionId: TransactionId, amount: Money): void {
    this.ensureActive();
    if (amount.amount <= 0) throw new InvalidAmountException("El monto del retiro debe ser mayor que cero.");
    if (!this._balance.isGreaterThanOrEqual(amount)) throw new InsufficientFundsException(this.id.value, amount.amount, this._balance.amount);
    this._balance = this._balance.subtract(amount);
    const transaction = Transaction.createWithdrawal(trannsactionId, amount);
    this._transactions.push(transaction);
    this.recordEvent(new MoneyWithdrawnEvent(this.id, trannsactionId, amount));
  }

  /**
     * Cierra la cuenta. Una vez cerrada, no se permiten más operaciones.
     * @throws {AccountNotActiveException} Si la cuenta ya está cerrada.
     */
  close(): void {
    this.ensureActive();
    this._status = "CLOSED";
    this.recordEvent(new AccountClosedEvent(this.id));
  }

  /**
     * Limpia los eventos acumulados (útil después de publicarlos en un bus de eventos).
     */
  clearDomainEvents(): void {
    this._domainEvents.length = 0;
  }

  /** Asegura que la cuenta esté activa antes de cualquier operación. */
  private ensureActive(): void {
    if (this._status !== "ACTIVE") throw new AccountNotActiveException(this.id.value, this._status);
  }

  /** Registra un evento de dominio en la lista interna. */
  private recordEvent(event: unknown): void {
    this._domainEvents.push(event);
  }
}
