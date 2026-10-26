import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseController } from "@/modules/course/course.controller";
import { Course } from "@/modules/course/entities/course.entity";
import { CourseService } from "@/modules/course/course.service";

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
