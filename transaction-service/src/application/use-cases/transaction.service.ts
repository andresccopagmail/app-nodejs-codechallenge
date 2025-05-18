import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/persistence/prisma.service';
import { KafkaService } from '../../infrastructure/kafka/kafka.service';
import { CreateTransactionDto } from '../../interfaces/dto/create-transaction.dto';
import { TransactionStatus } from '../../domain/enums/transaction-status.enum';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafka: KafkaService,
  ) {}

  async create(dto: CreateTransactionDto) {
    const transaction = await this.prisma.transaction.create({
      data: {
        ...dto,
        status: TransactionStatus.PENDING,
      },
    });

    await this.kafka.emit('transaction_created', {
      transactionExternalId: transaction.id,
      value: dto.value,
    });

    return transaction;
  }

  async findOne(id: string) {
    return this.prisma.transaction.findUnique({ where: { id } });
  }

  async updateStatus(id: string, status: TransactionStatus) {
    return this.prisma.transaction.update({
      where: { id },
      data: { status },
    });
  }
}