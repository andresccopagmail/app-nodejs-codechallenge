import { Module } from '@nestjs/common';
import { KafkaController } from './interfaces/controllers/kafka.controller';
import { AntiFraudService } from './application/anti-fraud.service';
import { KafkaEventBus } from './infrastructure/kafka/kafka.event-bus';

@Module({
  imports: [],
  controllers: [KafkaController],
  providers: [AntiFraudService, KafkaEventBus],
})
export class AppModule { }
