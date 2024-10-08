import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): ReturnType<typeof this.authService.signup> {
    return this.authService.signup(authCredentialsDto);
  }

  @Post('/login')
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): ReturnType<typeof this.authService.login> {
    return this.authService.login(authCredentialsDto);
  }
}
