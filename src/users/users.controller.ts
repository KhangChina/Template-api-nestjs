/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 22/08/2022
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, GetAllDataUser, PaginateUser, ReposeGetOneUser, ReposeUserDto, UpdateUserDto } from './dto/open-api-user.dto';

import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiExtraModels, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import JwtAccessGuard from 'src/guards/jwt-access.guard';
import { Roles, RolesEnum } from 'src/decorators/roles.decorator';
import RolesGuard from 'src/guards/roles.guard';


@ApiBearerAuth()
// @UseGuards(JwtAccessGuard)
// @UseGuards(RolesGuard)
// @Roles(RolesEnum.admin)
@ApiTags('Users')
@ApiExtraModels(ReposeUserDto, ReposeGetOneUser, PaginateUser)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  //#region swagger
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    schema: { type: 'object', properties: {  statusCode:{ type : 'Number', example: 201 },data : { $ref: getSchemaPath(ReposeUserDto)} } },
  })
  @ApiConflictResponse({
    description: 'Conflict Username. ',
    schema: { type: 'object', example: { statusCode: 409, message: "Conflict Username" }},
  })
  @ApiBadRequestResponse({
    description: 'Validate error ',
    schema: {
      type: 'object', example: {
        "statusCode": 400,
        "message": [
          "each value in role must be a valid enum value"
        ],
        "error": "Bad Request"
      }
    },
  })

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    //Step 1 Check username exits
    const userCurrent = await this.usersService.checkUserNameExist(createUserDto.username)
    if (userCurrent) {
      throw new HttpException(`Username ${createUserDto.username} exist !`, HttpStatus.CONFLICT);
    }
    //Step 2 Create user account 
    return {
      statusCode: 201,
      data: await this.usersService.create(createUserDto)
    }
  }

  //#region swagger
  @ApiOkResponse({
    description: 'The record has been find',
    schema: { type: 'object', properties: { data: { $ref: getSchemaPath(ReposeGetOneUser) } } },
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    schema: {
      type: 'object', example: {
        "statusCode": 404,
        "message": "ID 2 not found !"
      }
    },
  })
  //#endregion

  @Get(':id')
  async findOne(@Param('id') id: number) {
    let data = await this.usersService.findOneByID(id)
    if (!data) {
      throw new HttpException(`ID ${id} not found !`, HttpStatus.NOT_FOUND)
    }
    return {
      data
    }
  }
  //#region swagger
  @ApiOkResponse({
    description: 'The record has been find',
    type: GetAllDataUser,
  })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'per_page', required: false })
  //#endregion
  @Get()
  async findAll(@Query() query) {
    const search: string = query.search ? query.search : ""
    const page: number = query.page > 0 ? query.page : 1
    const limit: number = query.per_page ? query.per_page : 20
    const data = await this.usersService.getAll(page, limit, search)
    return {
      data: data.items,
      paginate: data.meta
    }
  }

  //#region swagger
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    schema: { type: 'object', properties: { data: { $ref: getSchemaPath(ReposeUserDto) } } },// ,
  })
  @ApiBadRequestResponse({
    description: 'Validate error ',
    schema: {
      type: 'object', example: {
        "statusCode": 400,
        "message": [
          "each value in role must be a valid enum value"
        ],
        "error": "Bad Request"
      }
    },
  })
  //#endregion end swagger
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    //Check user
    const user = await this.usersService.findOneByID(+id)
    if (!user) {
      throw new HttpException(`ID ${id} not found !`, HttpStatus.NOT_FOUND)
    }

    //Update user
    const data = await this.usersService.update(+id, updateUserDto)
    if (data.affected !== 0) {
      return {
        data: await this.usersService.findOneByID(+id)
      }
    }

    throw new HttpException(`Update user ID ${id} error!`, HttpStatus.BAD_REQUEST)

  }

  //#region swagger
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    schema: {
      type: 'object', example: {
        "data": "Delete successfully ID"
      }
    },
  })
  @ApiBadRequestResponse({
    description: 'Bat request error ',
    schema: {
      type: 'object', example: {
        "statusCode": 400,
        "message": "Delete user ID ${id} error!",
      }
    },
  })
  //#endregion
  @Delete(':id')
  async remove(@Param('id') id: string) {
    //Check user
    const user = await this.usersService.findOneByID(+id)
    if (!user) {
      throw new HttpException(`ID ${id} not found !`, HttpStatus.NOT_FOUND)
    }
    //Update status user
    const data = await this.usersService.remove(+id)
    if (data.affected !== 0) {
      return {
        statusCode: 200,
        data: `Delete successfully ID: ${id}`
      }
    }
    throw new HttpException(`Delete user ID ${id} error!`, HttpStatus.BAD_REQUEST)
  }

}
