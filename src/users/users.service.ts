/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 22/08/2022
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateUserDto, ReposeUserDto, UpdateUserDto } from './dto/open-api-user.dto';

import { User } from './entities/user.entity';
import 'dotenv/config'
import * as bcrypt from 'bcrypt';
import {  paginate} from 'nestjs-typeorm-paginate';
import { UserStatusEnum } from 'src/decorators/userStatus.decorator';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User,'core') private userRepository: Repository<User>) { }

  private async _createPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  async create(createUserDto: CreateUserDto) {
    try { 
      //Create user
      createUserDto.password = await this._createPassword(createUserDto.password)
      let userNew = await this.userRepository.save(createUserDto)
      let response: ReposeUserDto = {
        id: userNew.id,
        email: userNew.email,
        role: userNew.role,
        status: userNew.status,
        created_at: userNew.created_at,
        updated_at: userNew.updated_at,
        username: userNew.username,
        name:userNew.name,
        verified: userNew.verified,
        departmentID:userNew.departmentID
      }
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async checkUserNameExist(userName: string)
  {
    let userCurrent = await this.userRepository.findOne({where:{username: userName,status: Not(UserStatusEnum.deleted)}})
    return userCurrent
  }
  
  async findOne(username:string, password: string) {
    let userCurrent = await this.userRepository.findOne({where:{username: username, password:password,status: Not(UserStatusEnum.deleted)}})
    return userCurrent
  }

  async findOneByID(id:number) {
    let userCurrent = await this.userRepository.findOne({where:{id:id,status: Not(UserStatusEnum.deleted)}})
    if(userCurrent)
    {
      const data : ReposeUserDto = {
        id: userCurrent.id,
        email: userCurrent.email,
        role: userCurrent.role,
        status: userCurrent.status,
        created_at: userCurrent.created_at,
        updated_at: userCurrent.updated_at,
        username: userCurrent.username,
        name:userCurrent.name,
        verified: userCurrent.verified,
        departmentID:userCurrent.departmentID
      }
      return  data
    }
    return null
  }

  
  async getAll(page: number, limit: number,search: string) {
    const queryBuilder = this.userRepository.createQueryBuilder('u')
    queryBuilder.select(['u.id','u.email','u.username','u.name','u.media','u.verified','u.role','u.status','u.departmentID','u.created_at','u.updated_at'])
    queryBuilder.where("u.name like :name", { name:`%${search}%` })
    queryBuilder.where("u.status != :deleted", { deleted:`${UserStatusEnum.deleted}` })
    queryBuilder.orderBy('u.created_at', 'DESC')
    return paginate<User>(queryBuilder,{ page, limit });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let userCurrent = await this.userRepository.update(id,updateUserDto)
    return userCurrent;
  }

  async remove(id: number) {
    let userCurrent = await this.userRepository.update(id,{status: UserStatusEnum.deleted})
    return userCurrent;
  }
  //#region Function Authentication
  async findUserByEmailToken(id:number)
  {
    let userCurrent = await this.userRepository.findOne({where:{id:id,verified:false,status: Not(UserStatusEnum.deleted)}})
    return userCurrent
  }
  async updateUserVerifyToken(id:number)
  {
    let userCurrent = await this.userRepository.update(id,{verified:true})
    return userCurrent
  }
  async updateUserResTokenForUser(id:number,resToken: string)
  {
    let userCurrent = await this.userRepository.update(id,{tokenEpay:resToken})
     return userCurrent
  }
  async checkResTokenUser(resToken:string) {
    let userCurrent = await this.userRepository.findOne({where:{tokenEpay: resToken,status: Not(UserStatusEnum.deleted)}})
    return userCurrent
  }
  //#endregion
}
