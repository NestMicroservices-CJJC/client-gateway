import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
// import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    // console.log({ mensaje: 'por aquí pasó' });
    // return throwError(() => exception.getError());
    // throw new UnauthorizedException('no autorizado');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const rpcError = exception.getError();

    // console.log(rpcError);

    if (typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError) {
      const status = isNaN(Number(rpcError.status)) ? 400 : +rpcError.status;
      return response.status(status).json(rpcError);
    }

    response.status(400).json({
      status: 400,
      message: rpcError,
    });
  }
}
