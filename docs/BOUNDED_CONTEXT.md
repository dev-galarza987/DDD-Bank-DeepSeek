```mermaid
classDiagram
    direction TB

    package AccountAggregate {
        class BankAccount
        class Transaction
        class AccountId
        class TransactionId
        class AccountStatus {
            <<enumeration>>
            ACTIVE
            CLOSED
        }
    }

    package SharedValueObjects {
        class Money
        class Currency
    }

    package DomainEvents {
        class AccountOpenedEvent
        class MoneyDepositedEvent
        class MoneyWithdrawnEvent
        class AccountClosedEvent
    }

    package DomainExceptions {
        class InsufficientFundsException
        class InvalidAmountException
        class AccountNotActiveException
    }

    package Services {
        class FundsTransferService
    }

    package Repositories {
        class AccountRepository {
            <<interface>>
        }
    }

    BankAccount *-- "1..*" Transaction : contiene
    BankAccount --> AccountId : identifica
    BankAccount --> Money : saldo
    BankAccount --> AccountStatus : estado
    BankAccount ..> AccountOpenedEvent : registra
    BankAccount ..> MoneyDepositedEvent : registra
    BankAccount ..> MoneyWithdrawnEvent : registra
    BankAccount ..> AccountClosedEvent : registra
    BankAccount ..> InsufficientFundsException : lanza
    BankAccount ..> InvalidAmountException : lanza
    BankAccount ..> AccountNotActiveException : lanza

    Transaction --> TransactionId : identifica
    Transaction --> Money : monto
    Money --> Currency : moneda

    FundsTransferService ..> BankAccount : opera sobre
    FundsTransferService ..> InsufficientFundsException : lanza

    AccountRepository ..> BankAccount : persiste
```mermaid

