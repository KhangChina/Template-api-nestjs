/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 22/08/2022
 */
import { RolesEnum } from "src/decorators/roles.decorator";
import { UserStatusEnum } from "src/decorators/userStatus.decorator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class User {
        @PrimaryGeneratedColumn()
        id: number

        @Column() //set pro column
        name: string 

        @Column({unique:true}) //set pro column
        username: string 
 
        @Column({default: ""})
        email: string
      
        @Column({default: false})
        verified:boolean
      
        @Column({default: ""})
        password: string 
      
        @Column({default: ""})
        tokenEpay: string 

        @Column({default: ""})
        tokenBank: string 

        @Column({default: ""})
        media: string 

        @Column({default: RolesEnum.staff})//{nullable: true}
        role: RolesEnum

        @Column({default:UserStatusEnum.active})//{nullable: true}
        status: UserStatusEnum

        @Column({default: ""})
        departmentID: number

        @CreateDateColumn()
        created_at: Date
        
        @UpdateDateColumn()
        updated_at: Date

}
