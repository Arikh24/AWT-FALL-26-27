import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateStudentDto } from "@/modules/student/dto/create-student.dto";
import { Student } from "@/modules/student/entities/student.entity";

@Injectable()
export class StudentService {
  constructor(@InjectRepository(Student) private readonly repo: Repository<Student>) {}

  create(dto: CreateStudentDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find();
  }
}
