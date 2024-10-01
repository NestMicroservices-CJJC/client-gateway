import { Controller, Get, Post, Body, Param, Inject, Query, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateOrderDto, OrderPaginationDto } from './dto';
import { catchError, firstValueFrom } from 'rxjs';
import { StatusDto } from './dto/status.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send({ cmd: 'createOrder' }, createOrderDto);
  }

  @Get()
  async findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      const orders = await firstValueFrom(this.client.send({ cmd: 'findAllOrders' }, orderPaginationDto));
      return orders;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(this.client.send({ cmd: 'findOneOrder' }, { id }));
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  changeOrderStatus(@Param('id', ParseUUIDPipe) id: string, @Body() statusDto: StatusDto) {
    return this.client.send({ cmd: 'changeOrderStatus' }, { id, status: statusDto.status }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );

    /* return {
      id,
      statusDto,
    }; */
  }
}
