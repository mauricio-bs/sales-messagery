import { BaseEntity } from './BaseEntity';

export class Category extends BaseEntity {
  public name: string;
  public isActive: boolean;

  constructor(props: Omit<Category, 'id'>, id?: string) {
    super();

    Object.assign(this, props);

    if (!id) this.id = crypto.randomUUID();
  }
}
