import { Client, ClientKafka } from '@nestjs/microservices';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { kafkaConfig } from './kafka.config';

@Injectable()
export class KafkaEventBus {
  @Client(kafkaConfig)
  client: ClientKafka;

  async emit(topic: string, message: any): Promise<void> {
    await firstValueFrom(this.client.emit(topic, JSON.stringify(message)));
  }
}
