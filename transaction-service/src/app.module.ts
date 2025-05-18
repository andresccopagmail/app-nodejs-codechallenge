import { Module } from '@nestjs/common';
import { KafkaModule } from './infrastructure/kafka/kafka.config';
import { TransactionController } from './interfaces/controllers/transaction.controller';
import { TransactionEventsController } from './interfaces/controllers/transaction-events.controller';
import { TransactionService } from './application/use-cases/transaction.service';
import { KafkaService } from './infrastructure/kafka/kafka.service';
import { PrismaService } from './infrastructure/persistence/prisma.service';

@Module({
  imports: [KafkaModule],
  controllers: [TransactionController, TransactionEventsController],
  providers: [TransactionService, PrismaService, KafkaService],
})
export class AppModule { }
