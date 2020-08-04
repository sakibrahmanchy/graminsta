import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Req,
  Render,
} from 'routing-controllers';
import UserService from '../services/user.service';
import { UserRegistrationResponse } from '../responses/users/user.registration.response';
import { UserRegistrationInput } from '../requests/users/user.registration.input';
import { UserLoginResponse } from '../responses/users/user.login.response';
import { UserLoginInput } from '../requests/users/user.login.input';
import { Response } from 'express';

@Controller()
export class LoginController {
  constructor(private readonly userService: UserService) {
  }

  @Get('/log')
  @Render('login')
  // tslint:disable-next-line:no-empty
    dashboard() {
  }

  @Post('/register')
    async addUser(
        @Body({ validate: true }) user: UserRegistrationInput,
    ): Promise<UserRegistrationResponse> {
    return this.userService.add(user);
  }

  @Post('/login')
    async logUserIn(
        @Body({ validate: true }) credentials: UserLoginInput,
        @Req() req,
        @Res() res,
    ) {
    try {
      // if (req.accepts(['html', 'json']) === 'json') {
      return this.userService.logInUser(credentials);
      // }
      // res.redirect('/dashboard');
    } catch (e) {
      res.redirect('/login');
    }
  }

}
