# 🚀 Getting Started — Yape Code Challenge (NestJS + Prisma + Kafka)

Este documento te guiará paso a paso para levantar los microservicios `transaction-service` y `anti-fraud-service`, utilizando PostgreSQL, Kafka y Docker.

---

## 📦 Requisitos

- Node.js v18+
- Docker y Docker Compose
- `npm` o `yarn`
- Kafka (incluido en Docker Compose)

---

## ⚙️ 1. Levantar infraestructura base

Inicia la base de datos y Kafka utilizando Docker:

```bash
docker compose up -d
````

Esto levantará los siguientes contenedores:

* `postgres`: Base de datos relacional
* `kafka` y `zookeeper`: Sistema de mensajería distribuida

---

## 🧱 2. Iniciar el microservicio `transaction-service`

Desde la carpeta `transaction-service`, ejecuta:

```bash
# Instalar dependencias (si no lo has hecho)
npm install

# Generar el cliente de Prisma
npx prisma generate

# Ejecutar la primera migración (creación de tablas)
npx prisma migrate dev --name init

# Iniciar el servicio en modo desarrollo
npm run start:dev
```

> Esto levantará el servicio en `http://localhost:3000`.

---

## 🧠 3. Iniciar el microservicio `anti-fraud-service`

Desde la carpeta `anti-fraud-service`, ejecuta:

```bash
# Instalar dependencias (si no lo has hecho)
npm install

# Iniciar el microservicio en modo escucha
npm run start:dev
```

> Este microservicio no expone endpoints HTTP, solo escucha y emite eventos Kafka.

---

## 🧪 4. Probar creación de una transacción

Envía una solicitud `POST` al servicio de transacciones:

```bash
curl --location 'http://localhost:3000/transactions' \
--header 'Content-Type: application/json' \
--data '{
  "accountExternalIdDebit": "8b58f120-3d8c-4dbe-b172-2fa774d5fa8a",
  "accountExternalIdCredit": "9c98f120-3d8c-4dbe-b172-2fa774d5fb9b",
  "tranferTypeId": 1,
  "value": 1800
}'
```

📌 Esto debería:

1. Guardar la transacción con estado `pending` en la base de datos.
2. Emitir el evento `transaction_created` a Kafka.
3. Ser capturado por `anti-fraud-service`, que evaluará el valor.
4. Retornar un nuevo evento `transaction_validated` con el estado `rejected`.
5. Actualizar el estado de la transacción en la base de datos.

---

## ✅ Verificar

Puedes verificar el estado final de la transacción con el endpoint `GET`:

```bash
curl http://localhost:3000/transactions/<transactionExternalId>
```

---

## 🧼 Apagar los servicios

Para detener los servicios de Docker:

```bash
docker compose down
```
