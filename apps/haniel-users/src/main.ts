import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'queue.users',
        queueOptions: { durable: true },
        exchange: 'exchange.haniel-users',
        exchangeType: 'topic',
      },
    },
  );

  await app.listen();
}
bootstrap();
