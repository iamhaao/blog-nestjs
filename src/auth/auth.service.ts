import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from 'src/user/dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  generateJWT(user: UserEntity) {
    return jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  }

  hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  comparePassword(confirmPassword: string, password: string) {
    return bcrypt.compareSync(confirmPassword, password);
  }

  async login(userLogin: LoginUserDto): Promise<any> {
    const user = await this.userService.validateUser(
      userLogin.email,
      userLogin.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateJWT(user);
    delete user.password;
    return { user, access_token: token };
  }
}
