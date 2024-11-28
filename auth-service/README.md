#### **`auth-service`**

```markdown
# Auth Service

Este microservicio se encarga de manejar la autenticación de usuarios, incluyendo la creación, validación y roles de los mismos.

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
auth-service/
├── src/
│   ├── entities/
│   │   ├── User.ts
│   │   └── TypeUser.ts
│   ├── grpc/
│   │   └── auth.proto
│   ├── services/
│   │   └── AuthService.ts
│   ├── grpcServer.ts
│   ├── index.ts
├── package.json
└── tsconfig.json
