import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { User } from '../entity/User';
import { Service } from 'typedi';
import UserService from '../services/user.service';

@Service()
@ValidatorConstraint({ async: true })
export class EmailDoesNotExistConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {
  }

  async validate(
      email: any,
      args: ValidationArguments) {
    return !!(await this.userService.getUserByEmail(email));
  }
}

export function emailDoesNotExist(validationOptions?: ValidationOptions) {
  return (object, propertyName: string) => {
    registerDecorator({
      propertyName,
      target: object.constructor,
      options: validationOptions,
      constraints: [],
      validator: EmailDoesNotExistConstraint,
    });
  };
}
