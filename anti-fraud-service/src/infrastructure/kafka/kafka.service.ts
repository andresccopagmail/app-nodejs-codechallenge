import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('transaction_created');
    await this.kafkaClient.connect();
  }

  async emit(topic: string, payload: any) {
    return this.kafkaClient.emit(topic, payload);
  }
}