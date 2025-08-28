import { DatabaseModule } from '@common/database/database.module';
import { ConfigurationsModule } from '@config/configurations.module';
import { IndexModule } from '@modules/Index.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [IndexModule, ConfigurationsModule, DatabaseModule],
})
export class AppModule {}
