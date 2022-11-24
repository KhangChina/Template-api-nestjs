import { Injectable } from '@nestjs/common'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()

export class CustomersService {
 constructor(@InjectDataSource('core') private dataSource: DataSource){}
  query :any = "";
  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  async findAll() {
    this.query= "SELECT TOP 10 PAT_CODE,PAT_ID,FULLNAME,BIRTHDAY,GENDER,PHONE from PATIENTS "
    const queryRunner = await this.dataSource.query(this.query);
    return queryRunner
  }
  async checkPatientsCode(PAT_CODE: string) {
    this.query = `SELECT * FROM PATIENTS WHERE PAT_CODE = @0`
    const queryRunner = await this.dataSource.query(this.query,[PAT_CODE]);
    if(queryRunner.length > 0)
    {
      return queryRunner[0]
    }
    return null
  }

  async comparePassword(password: string,PATIENTS: any)
  {
    // = password.substr(password.length, 4)  
    let BIRTHDAY = PATIENTS.BIRTHDAY
    if(BIRTHDAY.slice(-4) === password.slice(-4)) 
    {
      return true
    }
    return false

  }
  async findOne(id: string) {
    this.query = `SELECT * FROM PATIENTS WHERE PAT_CODE = @0`
    const queryRunner = await this.dataSource.query(this.query,[id]);
    if(queryRunner.length > 0)
    {
      return queryRunner[0]
    }
    return null
  }

  async findProfile(id: string) {
    this.query = `SELECT * FROM PATIENTS WHERE PAT_CODE = @0`
    const queryRunner = await this.dataSource.query(this.query,[id]);
    if(queryRunner.length > 0)
    {
      return queryRunner[0]
    }
    return null
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}

