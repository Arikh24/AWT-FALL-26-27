Product Management API (NestJS Lab Task 1)

A NestJS REST API for managing a small shop's products and employees, using TypeORM and PostgreSQL. All data is stored in a real database.
Student Details : 
SL No : 18 ; Name : Arikh Bin Eden ; ID : 23-52439-2 ; Sec: D
Tech Stack :
NestJS (TypeScript), TypeORM, PostgreSQL, class-validator, pnpm
Database Setup: Open DBeaver and create a New database named user.
Project Structure :
src/
└── modules/
    ├── product/
    │   ├── dto/
    │   ├── entities/
    │   ├── product.controller.ts
    │   ├── product.service.ts
    │   └── product.module.ts
    └── employee/
        ├── dto/
        ├── entities/
        ├── employee.controller.ts
        ├── employee.service.ts
        └── employee.module.ts
