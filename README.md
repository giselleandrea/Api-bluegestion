# Api-BlueGestion

Este proyecto es una arquitectura basada en microservicios que utiliza múltiples tecnologías modernas para brindar una solución escalable y modular. Los microservicios están diseñados para manejar diferentes aspectos del sistema, como autenticación, gestión de productos, pedidos, clientes y sucursales, y una aplicación frontend para la interacción del usuario.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para construir los microservicios.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **PostgreSQL**: Base de datos relacional utilizada para el almacenamiento de datos.
- **TypeORM**: ORM para la interacción con PostgreSQL.
- **gRPC**: Protocolo de comunicación entre microservicios.
- **React**: Biblioteca para construir la interfaz de usuario del frontend.

## Configuracion
Crear archivo .env con las siguientes variables de entorno:

JWT_SECRET=xxx

DATABASE_HOST=xxx
DATABASE_PORT=xx
DATABASE_USER=postgres
DATABASE_PASSWORD=xxx
DATABASE_NAME=bluegestion

AUTH_SERVICE_PORT=50051
ORDER_SERVICE_PORT=50052
PRODUCT_SERVICE_PORT=50053
CUSTOMER_SERVICE_PORT=50054
BRANCH_SERVICE_PORT=50055
API_GATEWAY_PORT=3000

AUTH_SERVICE_URL=localhost:50051
ORDER_SERVICE_URL=localhost:50052
PRODUCT_SERVICE_URL=localhost:50053
CUSTOMER_SERVICE_URL=localhost:50054
BRANCH_SERVICE_URL=localhost:50055

## Instalar dependencias. 
npm install

## Estructura del proyecto
## Arquitectura microservicios
```bash
Api-bluegestion/
├── api-gateway/
│   ├── src/
│   │   ├── app.ts
│   │   ├── config/
│   │   │   └── servicesConfig.ts
│   │   ├── grcp-clients/
│   │   │   ├── auth.client.ts
│   │   │   ├── order.client.ts
│   │   │   ├── product.client.ts
│   │   │   ├── customer.client.ts
│   │   │   └── branch.client.ts
│   │   ├── protos/
│   │   │   ├── auth.proto
│   │   │   ├── order.proto
│   │   │   ├── product.proto
│   │   │   ├── customer.proto
│   │   │   └── branch.proto
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── order.routes.ts
│   │   │   ├── product.routes.ts
│   │   │   ├── customer.routes.ts
│   │   │   └── branch.routes.ts
│   ├── package.json
│   └── tsconfig.json
├── auth-service/
│   ├── src/
│   │   ├── entities/
│   │   │   ├── User.ts
│   │   │   └── TypeUser.ts
│   │   ├── grpc/
│   │   │   └── auth.proto
│   │   ├── services/
│   │   │   └── AuthService.ts
│   │   ├── grpcServer.ts
│   │   ├── index.ts
│   ├── package.json
│   └── tsconfig.json
├── order-service/
│   ├── src/
│   │   ├── entities/
│   │   │   ├── OrderProduct.ts
│   │   │   └── Order.ts
│   │   ├── grpc/
│   │   │   └── order.proto
│   │   ├── services/
│   │   │   └── OrderService.ts
│   │   ├── grpcServer.ts
│   │   ├── index.ts
│   ├── package.json
│   └── tsconfig.json
├── product-service/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── ProductController.ts
│   │   ├── grpc/
│   │   │   └── product.proto
│   │   ├── services/
│   │   │   └── ProductService.ts
│   │   ├── grpcServer.ts
│   │   ├── grpcClient.ts
│   │   ├── database.ts
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
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
├── frontend-service/     
│   ├── src/
│   │   ├── api/
│   │   │   ├── axiosInstance.ts
│   │   │   ├── branchService.ts
│   │   │   ├── createhService.ts
│   │   │   ├── customerService.ts
│   │   │   ├── loginService.ts
│   │   │   ├── orderService.ts
│   │   │   └── createUserService.ts
│   │   ├── styles/
│   │   │   └── styles.css
│   │   ├── views/
│   │   │   ├── createBranch.tsx
│   │   │   ├── createCustomer.tsx
│   │   │   ├── home.tsx
│   │   │   ├── login.tsx
│   │   │   ├── createOrder.tsx
│   │   │   ├── createProduct.tsx
│   │   │   └── createUser.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── routes.tsx
│   ├── package.json
│   ├── .env
├── .env    
├── data-source.ts
├── package.json
└── tsconfig.json

```

