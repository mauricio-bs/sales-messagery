import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { User } from '@entities/User';

import { SigninDTO } from '../domain/dto/signin.dto';
import { IAuthService } from '../domain/service/IAuth.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_SERVICE') private userClient: ClientProxy,
  ) {}

  async signin(data: SigninDTO): Promise<string> {
    try {
      const user = await lastValueFrom(
        this.userClient.send<Omit<User, 'password'>>('user:signin', data),
      );

      return this.jwtService.sign({ role: user.role }, { subject: user.id });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Email ou senha inválidos');
    }
  }
}
