import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCourseDto } from "@/modules/course/dto/create-course.dto";
import { Course } from "@/modules/course/entities/course.entity";

@Injectable()
export class CourseService {
  constructor(@InjectRepository(Course) private readonly repo: Repository<Course>) {}

  create(dto: CreateCourseDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find();
  }
}
