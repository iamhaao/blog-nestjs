import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { LoginUserDto } from './dto/user-login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto): Promise<any> {
    return await this.userService.login(loginDto);
  }
  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.findOne(+id);
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.updateOne(+id, updateUserDTO);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<any> {
    return await this.userService.deleteOne(+id);
  }
}
