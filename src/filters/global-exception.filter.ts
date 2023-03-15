import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseObj } from 'src/common/dto/response.dto';

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.error(exception);

    let result: ResponseObj;
    const isHttpError = exception instanceof HttpException;

    if (!isHttpError) {
      result = {
        success: false,
        data: null,
        error: {
          code: 500,
          message: ['Internal Server Error'],
        },
      };

      return response.status(HttpStatus.OK).json(result);
    }

    let { message } = (exception as any).getResponse();
    const { statusCode } = (exception as any).getResponse();

    if (typeof message === 'string') {
      message = [message];
    }

    result = {
      success: false,
      data: null,
      error: {
        code: statusCode,
        message,
      },
    };

    response.status(HttpStatus.OK).json(result);
  }
}
