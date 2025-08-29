import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { SigninDTO } from '@modules/auth/domain/dto/signin.dto';
import { IAuthService } from '@modules/auth/domain/service/IAuth.service';

@Controller()
export class AuthController {
  constructor(private readonly service: IAuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() data: SigninDTO): Promise<string> {
    return await this.service.signin(data);
  }
}
