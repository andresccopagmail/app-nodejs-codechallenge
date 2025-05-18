import { Module } from '@nestjs/common';
import { KafkaModule } from './infrastructure/kafka/kafka.config';
import { KafkaController } from './interfaces/controllers/kafka.controller';
import { AntiFraudService } from './application/anti-fraud.service';
import { KafkaService } from './infrastructure/kafka/kafka.service';

@Module({
  imports: [KafkaModule],
  controllers: [KafkaController],
  providers: [AntiFraudService, KafkaService],
})
export class AppModule {}
