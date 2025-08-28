import { ESaleStatus } from '@common/enum/SaleStatus.enum';
import { BaseEntity } from './BaseEntity';
import { randomUUID } from 'node:crypto';
import { SaleItems } from './SaleItems';

export class Sale extends BaseEntity {
  public total: number;
  public status: ESaleStatus = ESaleStatus.pending;
  public items?: SaleItems[];

  constructor(
    props: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>,
    id?: string,
  ) {
    super();

    Object.assign(this, props);
    if (!id) this.id = randomUUID();
  }
}
