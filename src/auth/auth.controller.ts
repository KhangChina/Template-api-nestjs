// /**
//  * Author : khang.nguyen@htgsoft.com
//  * Setup : 19/08/2022
//  */
import { Controller, Post, UseGuards, UseInterceptors, Request, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import SignInDto from './dto/sign-in.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import LocalAuthGuard from './guards/local-auth.guard';
import JwtTokensDto from './dto/jwt-tokens.dto';
import WrapResponseInterceptor from 'src/interceptors/wrap-response.interceptor';
import JwtAccessGuard from 'src/guards/jwt-access.guard';
import authConstants from './auth-constants';
import { UsersService } from 'src/users/users.service';
import AuthBearer from 'src/decorators/auth-bearer.decorator';
import JwtRefreshGuard from 'src/guards/jwt-refresh.guard';

@ApiTags('Authentication')
@ApiExtraModels(JwtTokensDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private usersService: UsersService) { }
//#region swagger
  @ApiBody({ type: SignInDto })
  @ApiCreatedResponse({
    description: 'Login successfully',
    schema: { type: 'object', properties: { data: { $ref: getSchemaPath(JwtTokensDto) } } },
  })
//#endregion
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async signIn(@Request() req) {
    const user = req.user
    return this.authService.login(user.id, user.email, user.role)
  }

  @Get('verify/:token')
  async verify(@Param('token') token: string) {
    const user = await this.authService.verifyEmailVerToken(
      token,
      authConstants.jwt.secrets.accessToken,
    );
    //Check user
    const foundUser = await this.usersService.findUserByEmailToken(user.id)
    if (!foundUser) {
      throw new HttpException(`The user does not exist or verified`, HttpStatus.NOT_FOUND)
    }
    //Update verify User
    await this.usersService.updateUserVerifyToken(user.id)
    //Login
    return await this.authService.login(foundUser.id, foundUser.email, foundUser.role)
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  //#region swagger
  @ApiOkResponse({
    description: 'Get token and new resToken by res token successfully',
    schema: { type: 'object', properties: { data: { $ref: getSchemaPath(JwtTokensDto) }}}
  })
  @ApiUnauthorizedResponse({
    description: 'User logout need re-login',
    schema: { type: 'object', example: { statusCode: 401, message: "String" }}
  })
  //#endregion
  @Get('token')
  async getTokenAccessToken(@AuthBearer() token: string) {
    //Check token
    const decodeUser = await this.authService.verifyToken(token, authConstants.jwt.secrets.refreshToken)
    if (!decodeUser) {
      throw new HttpException(`Incorrect Refresh token`, HttpStatus.FORBIDDEN)
    }
    //Check token db
    const userByToKen = await this.usersService.checkResTokenUser(token)
    // console.log(userByToKen)
    if(!userByToKen)
    {
      throw new HttpException(`Logged out user or login from other devices!`, HttpStatus.UNAUTHORIZED)
    }
    //gen token and new res token
    return await this.authService.login(userByToKen.id,userByToKen.email,userByToKen.role)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Post('/logout')
  async logout(@Request() req) {
  const userLogout = req.user
  return await this.authService.logout(userLogout.id)
  }
}
