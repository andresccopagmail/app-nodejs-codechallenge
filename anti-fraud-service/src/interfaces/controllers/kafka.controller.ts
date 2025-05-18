import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AntiFraudService } from '../../application/anti-fraud.service';
import { KafkaService } from '../../infrastructure/kafka/kafka.service';

@Controller()
export class KafkaController {
  constructor(
    private readonly antiFraudService: AntiFraudService,
    private readonly kafkaService: KafkaService,
  ) {}

  @EventPattern('transaction_created')
  async handleTransactionCreated(@Payload() message: any) {
    console.log(`Topic transaction_created, message: ${JSON.stringify(message)}`);
    const { transactionExternalId, value } = message;

    const status = this.antiFraudService.validateTransaction(value);

    await this.kafkaService.emit('transaction_validated', {
      transactionExternalId,
      status,
    });
  }
}