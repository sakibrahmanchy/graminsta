import { InputType, Field } from 'type-graphql';

import { User } from '../../entity/User';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { emailDoesNotExist } from '../../validations/email-does-not-exist';

@InputType()
export class UserLoginInput implements Partial<User> {
  @Field()
  @MinLength(8, { message: 'Password should be minimum eight characters.' })
  @IsNotEmpty({ message: 'Enter a password for authentication.' })
  password: string;

  @Field()
  @IsEmail({}, { message: 'Invalid email format. Make sure you are using a correct email.' })
  @IsNotEmpty({ message: 'Please enter your email so that we can recognize you later.' })
    email: string;
}
