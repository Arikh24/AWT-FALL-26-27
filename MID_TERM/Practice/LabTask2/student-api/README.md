# Student Management API - Lab Task 2 (Nest Boilerplate)

Built on the provided Nest boilerplate (TypeORM + PostgreSQL).
Entities: **Department**, **Student**, **Course** (Student -> Department, Course -> Department).

## Where things are
| Part | Location |
|---|---|
| Entities | `src/modules/<name>/entities/<name>.entity.ts` |
| DTOs (`@IsNotEmpty()`) | `src/modules/<name>/dto/create-<name>.dto.ts` |
| Controllers / services / modules | `src/modules/<name>/` |
| DB connection | `src/config/database.config.ts` + `.env` |
| Migration | `src/database/migrations/*-CreateInitialTables.ts` |
| Validation (400) | boilerplate `ValidationPipe`, registered globally in `src/main.ts` |

## Setup
```bash
pnpm install            # or: npm install
# .env is included; set DB_PASSWORD to your PostgreSQL password
createdb -U postgres student_management_db
pnpm run migration:run  # creates all tables (synchronize is OFF)
pnpm run start:dev      # http://localhost:5001
```

## Migrations
```bash
pnpm run migration:generate -- src/database/migrations/CreateInitialTables
pnpm run migration:run
pnpm run migration:rollback
```
Verify: `psql -U postgres -d student_management_db -c "\dt"`
-> departments, students, courses, migrations.

## Endpoints (port 5001)
| Method | URL | Body |
|---|---|---|
| POST/GET | /departments | name, code, description |
| POST/GET | /students | firstName, lastName, email, phone, dateOfBirth, departmentId |
| POST/GET | /courses | title, code, credits, description, departmentId |

Create a department first. Empty/invalid fields return `400 Bad Request`.

## Postman
Import `postman_collection.json`; run 1-3 (POST), 4-6 (GET), 7-9 (validation -> 400).
