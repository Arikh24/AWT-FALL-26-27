import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccountType } from "@/modules/enums/accaunt-type.enum";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "full_name", type: "varchar", length: 100 })
  fullName!: string;

  @Column({ type: "varchar", length: 150, unique: true })
  email!: string;

  @Column({ type: "varchar" })
  password!: string; // stored as argon2 hash, never plain text

  @Column({ type: "int" })
  age!: number;

  @Column({ type: "varchar", length: 11 })
  phone!: string;

  @Column({ name: "account_type", type: "varchar", length: 20 })
  accountType!: AccountType;

  @Column({ type: "text", nullable: true })
  address!: string | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
