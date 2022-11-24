import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import authConstants from './auth-constants';
import { RolesEnum } from 'src/decorators/roles.decorator';
import { CustomersService } from 'src/customers/customers.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly customerService : CustomersService
  ) { }

  async validateUser(username: string, password: string) {
    let userLogin = await this.customerService.checkPatientsCode(username)
    if (userLogin === null) {
      throw new HttpException('Incorrect username', HttpStatus.UNAUTHORIZED);
    }
    //const passwordCompared = await bcrypt.compare(password, userLogin.password);
    const passwordCompared = await this.customerService.comparePassword(password,userLogin)
    if (!passwordCompared) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }
    return {
      id: userLogin.PAT_CODE,
      email: userLogin.EMAIL,
      role: RolesEnum.customer
    };
  }

  public async login(id: number,email: string, role: string) {
    const payload = {
      id: id,
      email: email,
      role: role
    };
    //Gen token
    const accessToken = this.jwtService.sign(payload, 
      {
      expiresIn: authConstants.jwt.expirationTime.accessToken,
      secret: authConstants.jwt.secrets.accessToken,
    }
    );
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.refreshToken,
      secret: authConstants.jwt.secrets.refreshToken,
    });

    //insert token db for user
    //await this.usersService.updateUserResTokenForUser(id,refreshToken)
    return {
      data:{
        accessToken,
        refreshToken,
      }
    }
  }
 
  public createVerifyToken(code: string): string {
    return this.jwtService.sign(
      { code },
      {
        expiresIn: authConstants.jwt.expirationTime.accessToken,
        secret: authConstants.jwt.secrets.accessToken,
      },
    );
  }
  
  public verifyEmailVerToken(token: string, secret: string) {
    return this.jwtService.verifyAsync(token, { secret });
  }

  public async verifyToken(token: string,secret: string){
    try {
      return (await this.jwtService.verifyAsync(token, {secret}))
    } catch (error) {
      return null;
    }
  }
  
  public async logout(id: number)
  {
    await this.usersService.updateUserResTokenForUser(id,'');
  }
}
