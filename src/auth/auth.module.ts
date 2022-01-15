import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthConfig } from './auth.config';

@Module({
  imports: [],
  providers: [AuthConfig, AuthService],
  controllers: [AuthController],
})

export class AuthModule {}
