import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateDepartmentDto } from "@/modules/department/dto/create-department.dto";
import { DepartmentService } from "@/modules/department/department.service";

@Controller("departments")
export class DepartmentController {
  constructor(private readonly service: DepartmentService) {}

  @Post()
  create(@Body() dto: CreateDepartmentDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
