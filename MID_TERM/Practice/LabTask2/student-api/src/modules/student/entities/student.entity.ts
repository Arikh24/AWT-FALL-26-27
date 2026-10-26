import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Department } from "@/modules/department/entities/department.entity";

@Entity("students")
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "first_name", length: 100 })
  firstName!: string;

  @Column({ name: "last_name", length: 100 })
  lastName!: string;

  @Column({ length: 150, unique: true })
  email!: string;

  @Column({ length: 30 })
  phone!: string;

  @Column({ name: "date_of_birth", type: "date" })
  dateOfBirth!: string;

  @Column({ name: "department_id" })
  departmentId!: number;

  @ManyToOne(() => Department, (department) => department.students, {
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "department_id" })
  department!: Department;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
