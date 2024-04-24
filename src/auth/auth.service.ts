import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  // constructor(private readonly userService: UserService) {}

  generateJWT(user: UserEntity) {
    return jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  }

  hashPassword(password: string) {
    const hasedPassword = bcrypt.hashSync(password, 10);
    return hasedPassword;
  }

  comparePassword(confirmPassword: string, password: string) {
    return bcrypt.compareSync(confirmPassword, password);
  }
}
