import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  credits!: number;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsInt()
  @IsNotEmpty()
  departmentId!: number;
}
