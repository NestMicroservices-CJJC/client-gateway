import { Controller, Get, Post, Body, Param, Inject, Query, ParseIntPipe } from '@nestjs/common';
import { PaginationDto } from 'src/common';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/config';
import { CreateOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly orderClient: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send({ cmd: 'createOrder' }, createOrderDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.orderClient.send({ cmd: 'findAllOrders' }, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderClient.send({ cmd: 'findOneOrder' }, { id });
  }
}
