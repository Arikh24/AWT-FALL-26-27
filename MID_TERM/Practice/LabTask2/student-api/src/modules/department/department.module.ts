import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DepartmentController } from "@/modules/department/department.controller";
import { Department } from "@/modules/department/entities/department.entity";
import { DepartmentService } from "@/modules/department/department.service";

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
