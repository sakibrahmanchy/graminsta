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
@Service({ global: true })
@ValidatorConstraint({ async: true })
export class EmailAlreadyExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {
    // console.log(this.userService);
  }

  async validate(
      email: any,
      args: ValidationArguments) {
    return !(await this.userService.getUserByEmail(email));
  }
}

export function emailAlreadyExists(validationOptions?: ValidationOptions) {
  return (object, propertyName: string) => {
    registerDecorator({
      propertyName,
      target: object.constructor,
      options: validationOptions,
      constraints: [],
      validator: EmailAlreadyExistsConstraint,
    });
  };
}
