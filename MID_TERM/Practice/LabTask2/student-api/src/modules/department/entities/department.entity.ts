import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "@/modules/student/entities/student.entity";
import { Course } from "@/modules/course/entities/course.entity";

@Entity("departments")
export class Department {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150, unique: true })
  name!: string;

  @Column({ length: 20, unique: true })
  code!: string;

  @Column({ type: "text" })
  description!: string;

  @OneToMany(() => Student, (student) => student.department)
  students!: Student[];

  @OneToMany(() => Course, (course) => course.department)
  courses!: Course[];
}
