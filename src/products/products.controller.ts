import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return 'crea un producto';
  }

  @Get()
  findAll() {
    return 'Obtengo todos los productos';
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
