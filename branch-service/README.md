#### **`branch-service`**

```markdown
# branch Service

Este microservicio se encarga de manejar las sucursales, creacion y consulta

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
├── branch-service/
│   ├── src/
│   │   ├── entities/
│   │   │   └── Branch.ts
│   │   ├── grpc/
│   │   │   └── branch.proto
│   │   ├── services/
│   │   │   └── BranchService.ts
│   │   ├── grpcServer.ts
│   │   ├── index.ts
│   ├── package.json
│   └── tsconfig.json