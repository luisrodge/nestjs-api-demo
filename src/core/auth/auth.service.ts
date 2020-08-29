import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passMatch = await user.comparePassword(pass);

    if (passMatch) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      businessId: user.businessId,
    };
    const { id, name, email } = await this.usersService.findByEmail(user.email);

    return {
      token: this.jwtService.sign(payload),
      user: { id, name, email },
    };
  }

  async register(values: Record<string, any>) {
    const { id, name, email, businessId } = await this.usersService.create(
      values,
    );
    const payload = { email: email, sub: id, businessId };

    return {
      token: this.jwtService.sign(payload),
      user: { id, name, email },
    };
  }
}
