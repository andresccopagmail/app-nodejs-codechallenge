import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AntiFraudService } from '../../application/anti-fraud.service';
import { KafkaEventBus } from 'src/infrastructure/kafka/kafka.event-bus';

@Controller()
export class KafkaController {
  constructor(
    private readonly antiFraudService: AntiFraudService,
    private readonly kafkaEventBus: KafkaEventBus,
  ) { }

  @EventPattern('transaction_created')
  async handleTransactionCreated(@Payload() message: any) {
    const { transactionExternalId, value } = message;

    const status = this.antiFraudService.validateTransaction(value);

    await this.kafkaEventBus.emit('transaction_validated', {
      transactionExternalId,
      status,
    });
  }
}