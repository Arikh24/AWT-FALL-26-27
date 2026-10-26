import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateCourseDto } from "@/modules/course/dto/create-course.dto";
import { CourseService } from "@/modules/course/course.service";

@Controller("courses")
export class CourseController {
  constructor(private readonly service: CourseService) {}

  @Post()
  create(@Body() dto: CreateCourseDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
