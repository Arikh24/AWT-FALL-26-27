import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as argon2 from "argon2";
import { User } from "@/modules/entities/user.entity";
import { CreateUserDto } from "@/modules/dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(dto: CreateUserDto) {
    // Business rule (not field validation): email must be unique
    const exists = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (exists) {
      throw new ConflictException("Email is already registered");
    }

    const user = this.userRepository.create({
      ...dto,
      address: dto.address ?? null,
      password: await argon2.hash(dto.password),
    });
    const saved = await this.userRepository.save(user);

    // Return only safe fields - password is NOT included
    return {
      message: "User registered successfully",
      user: {
        fullName: saved.fullName,
        email: saved.email,
        age: saved.age,
        accountType: saved.accountType,
      },
    };
  }
}
