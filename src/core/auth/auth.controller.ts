import { Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { DtoValidationPipe } from '../pipes/dto-validation.pipe';
import { CreateUserDto, ResultUserDto } from '../../users/user.dto';
import { ApiController } from '../../core/decorators/api-controller.decorator';
import { AnonymousAuthGuard } from './guards/anonymous-auth.guard';

@ApiController('/api/v1/auth', ResultUserDto, AnonymousAuthGuard)
export class AuthController {
  protected dtoValidationPipe: DtoValidationPipe;

  constructor(private authService: AuthService) {
    this.dtoValidationPipe = new DtoValidationPipe({
      transform: true,
      whitelist: true,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() data: Record<string, any>) {
    const dto = await this.dtoValidationPipe.transformToDto(
      CreateUserDto,
      data,
    );
    return this.authService.register(dto);
  }
}
