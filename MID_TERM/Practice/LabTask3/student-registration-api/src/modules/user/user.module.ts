import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@/modules/entities/user.entity";
import { UsersController } from "@/modules/user/user.controller";
import { UsersService } from "@/modules/user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
