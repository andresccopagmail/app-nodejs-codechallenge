import { Module } from '@nestjs/common';
import { TransactionController } from './interfaces/controllers/transaction.controller';
import { TransactionEventsController } from './interfaces/controllers/transaction-events.controller';
import { TransactionService } from './application/use-cases/transaction.service';
import { PrismaService } from './infrastructure/persistence/prisma.service';
import { KafkaEventBus } from './infrastructure/kafka/kafka.event-bus';

@Module({
  imports: [],
  controllers: [TransactionController, TransactionEventsController],
  providers: [TransactionService, PrismaService, KafkaEventBus],
})
export class AppModule { }
