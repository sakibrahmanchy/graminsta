import {
  Controller,
  Body,
  Post,
  Res,
} from 'routing-controllers';
import UserService from '../services/user.service';
import { UserRegistrationResponse } from '../responses/users/user.registration.response';
import { UserRegistrationInput } from '../requests/users/user.registration.input';
import { UserLoginInput } from '../requests/users/user.login.input';

/**
 * Controller for handling login, registration & authentications
 */
@Controller()
export class LoginController {
  /**
   * Injecting UserService to handle user registration and authentication
   * @param userService
   */
  constructor(private readonly userService: UserService) {
  }

  /**
   * Register using user:UserRegistrationInput data
   * @param user: UserRegistrationInput
   */
  @Post('/register')
    async addUser(
        @Body({ validate: true }) user: UserRegistrationInput,
    ): Promise<UserRegistrationResponse> {
    return this.userService.add(user);
  }

  /**
   * Login with credentials
   * @param credentials
   * @param res
   */
  @Post('/login')
    async logUserIn(
        @Body({ validate: true }) credentials: UserLoginInput,
        @Res() res,
    ) {
    try {
      return this.userService.logInUser(credentials);
    } catch (e) {
      res.redirect('/');
    }
  }

}
