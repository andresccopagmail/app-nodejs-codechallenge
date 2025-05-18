import { Injectable } from '@nestjs/common';

@Injectable()
export class AntiFraudService {
  validateTransaction(value: number): 'approved' | 'rejected' {
    return value > 1000 ? 'rejected' : 'approved';
  }
}