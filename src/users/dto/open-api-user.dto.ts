/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 22/08/2022
 */
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { RolesEnum } from "src/decorators/roles.decorator";
import { UserStatusEnum } from "src/decorators/userStatus.decorator";

//temple api input create user
export class CreateUserDto {

    @ApiProperty({ type: String, example: "Khang Nguyễn" })
    @IsNotEmpty()
    name: string

    @ApiProperty({ type: String, example: "khang.nguyen@htgsoft.com" })
    @IsEmail()
    email: string

    @ApiProperty({ type: String, example: "khang.nguyen" })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(128)
    username: string

    @ApiProperty({ type: String, example: "duc@linh123" })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(64)
    password: string

    @ApiProperty({ type: Boolean, required: false }) 
    @IsOptional() //if exist then check 
    @IsBoolean()
    verified: boolean

    @ApiProperty({ enum: RolesEnum })
    @IsEnum(RolesEnum, { each: true })
    role: RolesEnum

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    departmentID: number

    @ApiProperty({ enum: UserStatusEnum, required: false })
    @IsOptional()
    status: UserStatusEnum;

}
//temple api out create user
export class ReposeUserDto {

    @ApiProperty({ type: Number, example: 1 })
    id: Number

    @ApiProperty({ type: String, example: "khang.nguyen@htgsoft.com" })
    email: string

    @ApiProperty({ type: String, example: "khang.nguyen" })
    username: string

    @ApiProperty({ type: String, example: "Khang Nguyễn" })
    name: string


    @ApiProperty({ type: String, required: false, example: false })
    verified: boolean

    @ApiProperty({ enum: RolesEnum, required: false, example: RolesEnum.admin })
    role: RolesEnum

    @ApiProperty({ enum: UserStatusEnum, required: false, example: UserStatusEnum.active })
    status: UserStatusEnum;

    @ApiProperty({ type: Number, example: 2 })
    departmentID: number

    @ApiProperty({ type: Date })
    created_at: Date

    @ApiProperty({ type: Date })
    updated_at: Date

}
//temple api get one user
export class ReposeGetOneUser {
    @ApiProperty({ type: Number, example: 1 })
    id: Number

    @ApiProperty({ type: String, example: "khang.nguyen@htgsoft.com" })
    email: string

    @ApiProperty({ type: String, example: "khang.nguyen" })
    username: string

    @ApiProperty({ type: String, example: "Khang Nguyễn" })
    name: string

    @ApiProperty({ type: String, example: "http://localhost:300/public/staff/images.png" })
    media: string

    @ApiProperty({ type: String, required: false, example: false })
    verified: boolean

    @ApiProperty({ enum: RolesEnum, required: false, example: RolesEnum.admin })
    role: RolesEnum

    @ApiProperty({ enum: UserStatusEnum, required: false, example: UserStatusEnum.active })
    status: UserStatusEnum;

    @ApiProperty({ type: Number, example: 2 })
    departmentID: number

    @ApiProperty({ type: Date })
    created_at: Date

    @ApiProperty({ type: Date })
    updated_at: Date
}

//temple api paginate
export class PaginateUser {

    @ApiProperty({ type: Number, example: 1 })
    totalItems: number

    @ApiProperty({ type: Number, example: 1 })
    itemCount: number

    @ApiProperty({ type: Number, example: 20})
    itemsPerPage: number

    @ApiProperty({ type: Number, example: 1 })
    totalPages: number

    @ApiProperty({ type: Number, example: 1 })
    currentPage: number
}
//temple api get all user
export class GetAllDataUser <ReposeGetOneUser,PaginateUser> 
{
    @ApiProperty({ type: [ReposeGetOneUser]})
    data: ReposeGetOneUser[]

    @ApiProperty({ type: PaginateUser})
    paginate:PaginateUser
}
//temple api update user
export class UpdateUserDto {

    @ApiProperty({ type: String, example: "Khang Nguyễn" })
    @IsOptional()
    @IsNotEmpty()
    name: string

    @ApiProperty({ type: String, example: "khang.nguyen@htgsoft.com" })
    @IsOptional()
    @IsEmail()
    email: string

    @ApiProperty({ type: Boolean })
    @IsOptional()
    @IsBoolean()
    verified: boolean

    @IsEnum(RolesEnum, { each: true })
    @IsOptional()
    @ApiProperty({ enum: RolesEnum })
    role: RolesEnum

    @ApiProperty({ type: Number })
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    departmentID: number

    @ApiProperty({ enum: UserStatusEnum })
    @IsOptional()
    @IsEnum(UserStatusEnum, { each: true })
    status: UserStatusEnum;

}