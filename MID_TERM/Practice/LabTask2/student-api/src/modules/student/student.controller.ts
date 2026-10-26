import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateStudentDto } from "@/modules/student/dto/create-student.dto";
import { StudentService } from "@/modules/student/student.service";

@Controller("students")
export class StudentController {
  constructor(private readonly service: StudentService) {}

  @Post()
  create(@Body() dto: CreateStudentDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
