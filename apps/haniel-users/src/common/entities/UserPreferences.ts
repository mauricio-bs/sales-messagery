import { randomUUID } from 'node:crypto';
import { BaseEntity } from './BaseEntity';

export class UserPreferences extends BaseEntity {
  public theme: string;

  constructor(props: Omit<UserPreferences, 'id'>, id?: string) {
    super();

    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
