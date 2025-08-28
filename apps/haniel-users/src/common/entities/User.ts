import { Role } from '../enum/role.enum';
import { BaseEntity } from './BaseEntity';

export class User extends BaseEntity {
  public name: string;
  public email: string;
  public password: string;
  public isActive: boolean = true;
  public role: Role;

  constructor(props: Omit<User, 'id'>, id?: string) {
    super();

    Object.assign(this, props);
    if (id) this.id = id;
  }
}
