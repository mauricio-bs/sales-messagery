import { SigninDTO } from '../dto/signin.dto';

export abstract class IAuthService {
  abstract signin(data: SigninDTO): Promise<string>;
}
