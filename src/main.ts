import { BankAccount } from "./backing/domain/account/agregate/bank-account.aggregate.js";
import { FundsTransferService } from "./backing/domain/account/service/funds-transfer.service.js";
import { AccountId } from "./backing/domain/account/value-object/account-id.vo.js";
import { TransactionId } from "./backing/domain/account/value-object/transaction-id.vo.js";
import { Currency } from "./backing/domain/shared/value-object/currency.vo.js";
import { Money } from "./backing/domain/shared/value-object/money.vo.js";

const usd = Currency.create("USD");


// 1. Abrir dos cuentas.
const accountA = BankAccount.open(
  AccountId.create("ACC-001"),
  Money.create(1000, usd)
);

const accountB = BankAccount.open(
  AccountId.create("ACC-002"),
  Money.create(500, usd)
);


// 2. Depositar en la cuenta A.
accountA.deposit(
  TransactionId.create("TX-001"),
  Money.create(200, usd)
);
console.log(`Saldo A después del depósito: ${accountA.balance.amount} ${accountA.balance.currency.code}`); //--> 900 USD.


// 3. Retirar de la cuenta A.
accountA.withdrawal(
  TransactionId.create("TX-002"),
  Money.create(300, usd)
);
console.log(`Saldo A después del retiro: ${accountA.balance.amount} USD`); // 900 USD


// 4. Transferir de A a B usando el servicio de dominio
const transferService = new FundsTransferService();
transferService.transfer(
  accountA,
  accountB,
  Money.create(400, usd),
  TransactionId.create("TX-003"),
  TransactionId.create("TX-004")
);
console.log(`Saldo final A: ${accountA.balance.amount} USD`); // 500 USD
console.log(`Saldo final B: ${accountB.balance.amount} USD`); // 900 USD


// 5. Ver eventos acumulados (listos para publicar)
console.log("Eventos de A:", accountA.domainEvents.map((e: any) => e.eventName));
// [ 'AccountOpened', 'MoneyDeposited', 'MoneyWithdrawn', 'MoneyWithdrawn' ]


// 6. Intentar retirar más de lo disponible → lanza excepción de dominio
try {
  accountA.withdrawal(
    TransactionId.create("TX-005"),
    Money.create(1000, usd)
  );
} catch (error: any) {
  console.error(error.message);   // Fondos insuficientes en la cuenta ACC-001...
}
