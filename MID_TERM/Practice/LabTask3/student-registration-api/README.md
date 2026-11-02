student Registration API (NestJS Lab Task 3)
Built on the provided Nest boilerplate (TypeORM + PostgreSQL).
A NestJS REST API that lets new users register. Every request is validated with a DTO, `class-validator` decorators and a global `ValidationPipe` before it reaches the controller. Valid users are saved in a PostgreSQL database with a hashed password.
Student Details :
SL No : 18 ; Name : Arikh Bin Eden ; ID : 23-52439-2 ; Sec: D
Tech Stack :
NestJS (TypeScript), TypeORM, PostgreSQL, class-validator, class-transformer, argon2, pnpm
Where things are
Part	Location
DTO and validation decorators	`src/modules/users/dto/create-user.dto.ts`
Account type enum	`src/modules/users/enums/account-type.enum.ts`
Entity	`src/modules/users/entities/user.entity.ts`
Controller (`POST /users/register`)	`src/modules/users/users.controller.ts`
Service (save to database)	`src/modules/users/users.service.ts`
Module	`src/modules/users/users.module.ts`
Global ValidationPipe	`src/main.ts`
Module registration	`src/app.module.ts`
DB connection	`src/config/database.config.ts` + `.env`
Project Structure :
```
src/
├── main.ts                      # global ValidationPipe
├── app.module.ts                # UsersModule registered
└── modules/
    └── users/
        ├── dto/
        │   └── create-user.dto.ts
        ├── entities/
        │   └── user.entity.ts
        ├── enums/
        │   └── account-type.enum.ts
        ├── users.controller.ts
        ├── users.service.ts
        └── users.module.ts
```
Database Setup
Open DBeaver and create a new database named `student_management`.
Open a SQL script on that database (`Ctrl + ]`) and run:
```sql
CREATE TABLE IF NOT EXISTS public.users (
  id            SERIAL PRIMARY KEY,
  full_name     VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  password      VARCHAR      NOT NULL,
  age           INT          NOT NULL,
  phone         VARCHAR(11)  NOT NULL,
  account_type  VARCHAR(20)  NOT NULL,
  address       TEXT,
  created_at    TIMESTAMP    NOT NULL DEFAULT now()
);
```
Refresh the database in DBeaver. The `users` table appears under `public → Tables`.
Make sure `.env` matches your database:
```
DB_DATABASE="student_management"
DB_USER="postgres"
DB_PASSWORD="<your postgres password>"
```
How to Run
```bash
pnpm install
pnpm run start:dev      # http://localhost:5001
```
The server runs at `http://localhost:5001` (port comes from `PORT` in `.env`).
Task 1 - CreateUserDto
Field	Rule	Decorators
fullName	Required string, minimum 3 characters	`@IsString` `@IsNotEmpty` `@MinLength(3)`
email	Required, valid email	`@IsNotEmpty` `@IsEmail`
password	Minimum 8 characters with uppercase, lowercase, number and special character	`@IsString` `@IsNotEmpty` `@Matches(regex)`
age	Required integer from 18 to 60	`@Type(() => Number)` `@IsInt` `@Min(18)` `@Max(60)`
phone	Exactly 11 digits, starts with `01`	`@IsString` `@IsNotEmpty` `@Matches(/^01\d{9}$/)`
accountType	Either `student` or `teacher`	`@IsEnum(AccountType)`
address	Optional string, minimum 10 characters if supplied	`@IsOptional` `@IsString` `@MinLength(10)`
Password regex: `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/`
Task 2 - Global ValidationPipe (`src/main.ts`)
```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```
Option	Effect
`whitelist: true`	Removes properties that are not in the DTO
`forbidNonWhitelisted: true`	Rejects the request with `400` if unexpected properties are sent
`transform: true`	Converts the body into a `CreateUserDto` instance and converts types
Task 3 - Registration API
```ts
@Controller("users")
export class UsersController {
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }
}
```
No manual `if/else` validation is used in the controller. Validation is done only by the DTO decorators and `ValidationPipe`.
The service checks that the email is not already registered (`409 Conflict`), hashes the password with `argon2`, saves the user in PostgreSQL and returns only safe fields. The password is never returned.
API Endpoint :
Method	URL	Description
POST	/users/register	Register a new user
Valid request :
```json
{
  "fullName": "Rahim Ahmed",
  "email": "rahim@gmail.com",
  "password": "Rahim@123",
  "age": 22,
  "phone": "01712345678",
  "accountType": "student",
  "address": "Dhaka, Bangladesh"
}
```
Success response (201 Created) :
```json
{
  "message": "User registered successfully",
  "user": {
    "fullName": "Rahim Ahmed",
    "email": "rahim@gmail.com",
    "age": 22,
    "accountType": "student"
  }
}
```
Task 4 - Postman Testing
`POST http://localhost:5001/users/register` with Body → raw → JSON.
Test	Input Condition	Expected Result	Message
1	All fields valid	201 Created	User registered successfully
2	Invalid email address (`invalidemail`)	400 Bad Request	email must be a valid email address
3	Weak password (`12345`)	400 Bad Request	password must be at least 8 characters and include uppercase, lowercase, number and special character
4	Age below 18 (`15`)	400 Bad Request	age must not be less than 18
5	Unexpected `isAdmin` property	400 Bad Request	property isAdmin should not exist
Other responses:
Case	Result
Email already registered	409 Conflict
`address` not sent	201 Created (address is optional)
To run test 1 again, use a different email or run `DELETE FROM public.users;` in DBeaver.
Verify saved data in DBeaver:
```sql
SELECT * FROM public.users;
```
The `password` column contains an argon2 hash, not the plain password.
Submission Files
DTO: `src/modules/users/dto/create-user.dto.ts`
Controller: `src/modules/users/users.controller.ts`
ValidationPipe configuration: `src/main.ts`
Postman screenshots for the 5 tests (success and failed requests)
