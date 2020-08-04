import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { User } from '../entity/User';
import Repository from '../repository/repository';
import { RepositoryInterface } from '../repository/repository.interface';
import { Service } from 'typedi';
import UserService from '../services/user.service';

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
