import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  generateOtp(length: number) {
    let results = '';

    for (let i = 0; i < length; i++) {
      results += Math.round(Math.random() * 9);
    }

    return results;
  }
}
