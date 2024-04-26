import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.split(`Beader`)) {
      req.currentUser = null;
      next();
      return;
    }
    const token = authHeader.split(' ')[1];
    try {
      const { email } = jwt.verify(
        token,
        process.env.JWT_SECRET,
      ) as jwt.JwtPayload;
      const currentUser = await this.userService.findUserByEmail(email);
      req.currentUser = currentUser;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
