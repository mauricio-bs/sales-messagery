import { randomUUID } from 'node:crypto';

import { BaseEntity } from './BaseEntity';
import { Sale } from './Sale';

export class SaleItems extends BaseEntity {
  public name: string;
  public quantity: number;
  public unit_value: number;
  public total_value: number;
  public productId: string;
  public saleId: string;
  public sale?: Sale;

  constructor(props: Omit<SaleItems, 'id'>, id?: string) {
    super();
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
