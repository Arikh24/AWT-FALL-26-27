import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Department } from "@/modules/department/entities/department.entity";

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  title!: string;

  @Column({ length: 20, unique: true })
  code!: string;

  @Column({ type: "int" })
  credits!: number;

  @Column({ type: "text" })
  description!: string;

  @Column({ name: "department_id" })
  departmentId!: number;

  @ManyToOne(() => Department, (department) => department.courses, {
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "department_id" })
  department!: Department;
}
