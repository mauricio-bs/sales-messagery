import { EUnitType } from '../enum/unitType.enum';
import { BaseEntity } from './BaseEntity';
import { Category } from './Category';

export class Product extends BaseEntity {
  public name: string;
  public description?: string;
  public price: number;
  public costValue: number;
  public quantity: number;
  public isActive: boolean = true;
  public imageUrl?: string;
  public unitMeasure: EUnitType;
  public categoryId?: string;

  public Category?: Category;

  constructor(props: Omit<Product, 'id'>, id?: string) {
    super();

    Object.assign(this, props);

    if (id) this.id = id;
  }
}
