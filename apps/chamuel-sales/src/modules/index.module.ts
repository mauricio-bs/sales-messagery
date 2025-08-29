import { Module } from '@nestjs/common';

import { MessagingModule } from './messaging/messaging.module';
import { SaleModule } from './sale/sale.module';

@Module({
  imports: [SaleModule, MessagingModule],
})
export class IndexModule {}
