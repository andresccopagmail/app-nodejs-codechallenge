import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TransactionService } from 'src/application/use-cases/transaction.service';
import { TransactionStatus } from 'src/domain/enums/transaction-status.enum';

@Controller()
export class TransactionEventsController {
  constructor(private readonly transactionService: TransactionService) { }

  @EventPattern('transaction_validated')
  async handleTransactionValidated(@Payload() message: any) {
    const { transactionExternalId, status } = message;
    const newStatus =
      status === 'approved'
        ? TransactionStatus.APPROVED
        : TransactionStatus.REJECTED;

    await this.transactionService.updateStatus(transactionExternalId, newStatus);
  }
}
