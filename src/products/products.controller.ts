import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy) {}

  @Post()
  createProduct() {
    return 'crea un producto';
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: 'findAll_products' },
      /*       {
        limit: 5,
        page: 2,
      }, */
      paginationDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Obtengo el producto con id ${id}`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return `Actualizo el producto con id ${id}`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `Elimino el producto con id ${id}`;
  }
}
