import { IsString, IsEmail, IsInt, Min, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsInt()
  @Min(18)
  age!: number;

  @IsInt()
  @Min(0)
  yearsOfWorking!: number;
}