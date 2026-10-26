import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentController } from "@/modules/student/student.controller";
import { Student } from "@/modules/student/entities/student.entity";
import { StudentService } from "@/modules/student/student.service";

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
