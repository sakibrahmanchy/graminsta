import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Service } from 'typedi';
import UserService from '../services/user.service';

/**
 * Custom validator to validate if email exists in db or not
 */
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
