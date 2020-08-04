import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { User } from '../../entity/User';

export class UserLoginInput implements Partial<User> {
  @MinLength(8, { message: 'Password should be minimum eight characters.' })
  @IsNotEmpty({ message: 'Enter a password for authentication.' })
  password: string;

  @IsEmail({}, { message: 'Invalid email format. Make sure you are using a correct email.' })
  @IsNotEmpty({ message: 'Please enter your email so that we can recognize you later.' })
    email: string;
}
