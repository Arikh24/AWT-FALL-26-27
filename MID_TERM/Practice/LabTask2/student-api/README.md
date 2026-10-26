# Student Management API (NestJS Lab Task 2)

A NestJS REST API for managing a university's departments, students and courses, using TypeORM and PostgreSQL. All data is stored in a real database, and the tables are created using database migrations.

**Student Details :**
SL No : 18 ; Name : Arikh Bin Eden ; ID : 23-52439-2 ; Sec: D

**Tech Stack :**
NestJS (TypeScript), TypeORM, PostgreSQL, class-validator, pnpm

**Database Setup :**
Open DBeaver and create a New database named `student_management_db`.

**Project Structure :**
```
src/
├── database/
│   └── migrations/
└── modules/
    ├── department/
    │   ├── dto/
    │   ├── entities/
    │   ├── department.controller.ts
    │   ├── department.service.ts
    │   └── department.module.ts
    ├── student/
    │   ├── dto/
    │   ├── entities/
    │   ├── student.controller.ts
    │   ├── student.service.ts
    │   └── student.module.ts
    └── course/
        ├── dto/
        ├── entities/
        ├── course.controller.ts
        ├── course.service.ts
        └── course.module.ts
```

**Entities :**

| Entity | Fields |
|---|---|
| Department | id, name, code, description |
| Student | id, firstName, lastName, email, phone, dateOfBirth, departmentId, createdAt |
| Course | id, title, code, credits, description, departmentId |

Student and Course each belong to a Department.

**How to Run :**
```bash
pnpm install
pnpm run migration:run
pnpm run start:dev
```
The server runs at `http://localhost:5001`. Update `DB_PASSWORD` in `.env` to match your PostgreSQL password before running the migration.

**Migrations :**
```bash
pnpm run migration:generate -- src/database/migrations/CreateInitialTables
pnpm run migration:run
pnpm run migration:rollback
```
After running, the tables `departments`, `students` and `courses` appear in DBeaver (refresh the database).

**API Endpoints :**

| Method | URL | Description |
|---|---|---|
| POST | /departments | Create a department |
| GET | /departments | Get all departments |
| POST | /students | Create a student |
| GET | /students | Get all students |
| POST | /courses | Create a course |
| GET | /courses | Get all courses |

Create a department first, because students and courses need a valid `departmentId`.

**Validation :**
All required fields use `@IsNotEmpty()` from class-validator. Sending an empty required field returns `400 Bad Request`.

**Postman Testing :**
Import `postman_collection.json` into Postman and run the requests in order:
1. POST Department, Student and Course (201 Created)
2. GET Departments, Students and Courses (200 OK)
3. Invalid requests with an empty required field (400 Bad Request)
