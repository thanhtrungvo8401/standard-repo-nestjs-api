import { HttpStatus } from '@nestjs/common';

export type ResponseObj = {
  success: boolean;
  data: any;
  error?: { code: HttpStatus; message: Array<string> };
};
