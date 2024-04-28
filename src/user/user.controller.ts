import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { LoginUserDto } from './dto/user-login.dto';
import { Public, Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(createUserDto);
  }

  @Public()
  @Get()
  async index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<any> {
    return await this.userService.paginate(+page, +limit);
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

  @Public()
  @Put(':id/role')
  async updateRoleOfUser(
    @Param('id') id: string,
    @Body('role') role: Role,
  ): Promise<UserEntity> {
    return await this.userService.updateRoleOfUser(+id, role);
  }
}
