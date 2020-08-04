import { InputType, Field } from 'type-graphql';

import { User } from '../../entity/User';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { emailAlreadyExists } from '../../validations/email-exists';

@InputType()
export class UserRegistrationInput implements Partial<User> {
  @Field({ nullable: false })
  @IsNotEmpty({ message: 'Please provide your name.' })
    name: string;

  @Field()
  @MinLength(8, { message: 'Password should be minimum eight characters.' })
  @IsNotEmpty({ message: 'Enter a password for authentication.' })
  password: string;

  @Field()
  @IsEmail({}, { message: 'Invalid email format. Make sure you are using a correct email.' })
  @IsNotEmpty({ message: 'Please enter your email so that we can recognize you later.' })
  @emailAlreadyExists({ message: 'Email already exists. Please use another one.' })
    email: string;

  @Field()
    imageUrl: string;
}
