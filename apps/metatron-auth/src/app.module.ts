import { Module } from '@nestjs/common';

import { IndexModule } from '@modules/index.module';

import { ConfigurationsModule } from './common/config/configurations.module';

@Module({
  imports: [ConfigurationsModule, IndexModule],
})
export class AppModule {}
