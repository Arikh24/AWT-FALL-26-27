import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDepartmentDto } from "@/modules/department/dto/create-department.dto";
import { Department } from "@/modules/department/entities/department.entity";

@Injectable()
export class DepartmentService {
  constructor(@InjectRepository(Department) private readonly repo: Repository<Department>) {}

  create(dto: CreateDepartmentDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find();
  }
}
