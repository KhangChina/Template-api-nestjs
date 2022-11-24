import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles, RolesEnum } from 'src/decorators/roles.decorator';
import JwtAccessGuard from 'src/guards/jwt-access.guard';
import RolesGuard from 'src/guards/roles.guard';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiBearerAuth()
@UseGuards(JwtAccessGuard) //use jwt resource
@UseGuards(RolesGuard)
@Roles(RolesEnum.admin)
@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Roles(RolesEnum.customer)
  @Get(':id')
  async findOne(@Param('id') id: string,@Request() req) {
    const customer = req.user
    if(customer.role === RolesEnum.customer)
    {
      return await this.customersService.findProfile(customer.id);
    }
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }

}
