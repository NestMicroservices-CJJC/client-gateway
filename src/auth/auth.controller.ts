import { Controller, Get, Inject, Post } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('auth-register-user')
  registerUser() {
    return this.client.send('auth.register.user', {});
  }

  @Post('auth-login-user')
  loginUser() {
    return this.client.send('auth.login.user', {});
  }

  @Get('auth-verify-user')
  verifyToken() {
    return this.client.send('auth.verify.user', {});
  }
}
