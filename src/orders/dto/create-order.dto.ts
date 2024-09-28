import { IsNumber, IsPositive, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  totalAmount: number;
  @IsNumber()
  @IsPositive()
  totalItems: number;
  @IsEnum(OrderStatusList, {
    message: `Valid Status are ${OrderStatusList}`,
  })
  status: OrderStatus = OrderStatus.PENDING;
  @IsBoolean()
  @IsOptional()
  paid: boolean = false;
}
