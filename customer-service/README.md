#### **`customer-service`**

```markdown
# Customer Service

Este microservicio se encarga de manejar los clientes creacion y consultas.

## Tecnologías utilizadas

- **Node.js**
- **TypeScript**
- **PostgreSQL**
- **TypeORM**
- **gRPC**

## Ejecucion
npm install
npm run dev ó npm run start

## Estructura

```plaintext
├── customer-service/
│   ├── src/
│   │   ├── entities/
│   │   │   └── Customer.ts
│   │   ├── grpc/
│   │   │   └── customer.proto
│   │   ├── services/
│   │   │   └── CustomerService.ts
│   │   ├── grpcServer.ts
│   │   ├── index.ts
│   ├── package.json
│   └── tsconfig.json