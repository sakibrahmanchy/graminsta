import { Controller, Get } from 'routing-controllers';
import UserService from '../services/user.service';
import { User } from '../entity/User';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
    async users(): Promise<User[]> {
    return this.userService.getAll();
  }
}
