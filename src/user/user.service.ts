import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from './dto/user-login.dto';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  async create(user: CreateUserDto): Promise<UserEntity> {
    try {
      console.log(user);
      const hasedPassword = this.authService.hashPassword(user.password);
      user.password = hasedPassword;
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found!!!');
    }
    delete user.password;
    return user;
  }
  async deleteOne(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }
  async updateOne(id: number, userUpdate: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOne(id);
    Object.assign(user, userUpdate);
    const updatedUser = await this.userRepository.save(user);
    delete updatedUser.password;
    return updatedUser;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('Email not found');
    }
    return user;
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.findUserByEmail(email);
    const isMatchPassword = this.authService.comparePassword(
      password,
      user.password,
    );
    if (!isMatchPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
  async updateRoleOfUser(id: number, userRole: Role) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    user.role = userRole;
    return this.userRepository.save(user);
  }
}
