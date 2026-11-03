
# 🏦 Banking DDD — Modelo de Dominio en TypeScript Puro

> Implementación **completa** de un modelo de dominio bancario aplicando **Domain-Driven Design (DDD)** en TypeScript **sin frameworks, sin ORM, sin base de datos y sin dependencias externas**. Solo el dominio, tal cual.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![DDD](https://img.shields.io/badge/DDD-Tactical%20Patterns-9B59B6)
![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📑 Tabla de contenidos

- [📚 ¿Qué es DDD?](#-qué-es-ddd)
- [🧱 Bloques tácticos implementados](#-bloques-tácticos-implementados)
- [📂 Estructura del proyecto](#-estructura-del-proyecto)
- [🗺️ Diagramas de clases](#️-diagramas-de-clases)
- [💻 Código fuente](#-código-fuente)
  - [Objetos de valor compartidos](#objetos-de-valor-compartidos)
  - [Objetos de valor del agregado](#objetos-de-valor-del-agregado)
  - [Entidad `Transaction`](#entidad-transaction)
  - [Eventos de dominio](#eventos-de-dominio)
  - [Excepciones de dominio](#excepciones-de-dominio)
  - [Agregado `BankAccount`](#agregado-bankaccount)
  - [Servicio de dominio](#servicio-de-dominio)
  - [Repositorio (interfaz)](#repositorio-interfaz)
- [🧪 Ejemplo de uso](#-ejemplo-de-uso)
- [✅ Checklist de conceptos DDD](#-checklist-de-conceptos-ddd)
- [📄 Licencia](#-licencia)

---

## 📚 ¿Qué es DDD?

**Domain-Driven Design** (Eric Evans, 2003) propone modelar el software alrededor del **dominio del negocio** y su **lenguaje ubicuo**, alejando la lógica del código de infraestructura (frameworks, BD, ORM, HTTP, etc.).

Este repositorio aísla **exclusivamente la capa de dominio** del sector **Banca**, para demostrar que es posible modelar reglas de negocio complejas sin acoplarse a ninguna tecnología.

---

## 🧱 Bloques tácticos implementados

| Concepto DDD | Implementación en este repo |
| -------------- | ------------------------------ |
| **Contexto Delimitado** (Bounded Context) | Módulo `banking` |
| **Entidad** | `Transaction` (identidad `TransactionId`) |
| **Objeto de Valor** (VO) | `Currency`, `Money`, `AccountId`, `TransactionId` |
| **Agregado** + **Raíz del Agregado** | `BankAccount` (única puerta de entrada) |
| **Eventos de Dominio** | `AccountOpenedEvent`, `MoneyDepositedEvent`, `MoneyWithdrawnEvent`, `AccountClosedEvent` |
| **Excepciones de Dominio** | `InsufficientFundsException`, `InvalidAmountException`, `AccountNotActiveException` |
| **Servicio de Dominio** | `FundsTransferService` |
| **Repositorio** (interfaz) | `AccountRepository` |
| **Convención de archivos** | `*.vo.ts`, `*.entity.ts`, `*.aggregate.ts`, `*.event.ts`, `*.exception.ts` |

---

## 📂 Estructura del proyecto

src/
├── backing
│   └── domain
│       ├── account
│       │   ├── agregate
│       │   │   └── bank-account.aggregate.ts
│       │   ├── entity
│       │   │   └── transaction.entity.ts
│       │   ├── event
│       │   │   ├── account-closed.event.ts
│       │   │   ├── account-opened.event.ts
│       │   │   ├── money-deposited.event.ts
│       │   │   └── money-withdrawn.event.ts
│       │   ├── exception
│       │   │   ├── account-not-active.exception.ts
│       │   │   ├── insufficient-funds.exception.ts
│       │   │   └── invalid-amount.exception.ts
│       │   ├── repository
│       │   │   └── account.repository.ts
│       │   ├── service
│       │   │   └── funds-transfer.service.ts
│       │   └── value-object
│       │       ├── account-id.vo.ts
│       │       └── transaction-id.vo.ts
│       └── shared
│           └── value-object
│               ├── currency.vo.ts
│               └── money.vo.ts
└── main.t

---

## 🗺️ Diagramas de clases

Cada diagrama vive en su propio archivo dentro de `docs/diagrams/`. Se generaron con **Mermaid** y se pueden ver abriéndolos directamente en GitHub (si son `.md`) o pegándolos en [mermaid.live](https://mermaid.live).

| # | Diagrama | Descripción |
| --- | ---------- | ------------- |
| 1 | [**Contexto Delimitado**](docs/diagrams/01-contexto-delimitado.md) | Vista de alto nivel: paquetes, agregado, VOs, eventos, excepciones, servicio y repositorio. |
| 2 | [**Agregado `BankAccount`**](docs/diagrams/02-agregado-bank-account.md) | Detalle con atributos, métodos y firmas del agregado, entidad `Transaction` y VOs asociados. |
| 3 | [**Eventos de Dominio**](docs/diagrams/03-eventos-dominio.md) | Los 4 eventos inmutables del agregado y sus atributos. |
| 4 | [**Excepciones de Dominio**](docs/diagrams/04-excepciones-dominio.md) | Jerarquía de errores de negocio (heredan de `Error`). |
| 5 | [**Servicio y Repositorio**](docs/diagrams/05-servicio-y-repositorio.md) | `FundsTransferService` + interfaz `AccountRepository`. |

---
