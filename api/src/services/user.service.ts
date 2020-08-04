import { Service, Inject } from 'typedi';
import { User } from '../entity/User';
import Repository from '../repository/repository';
import { RepositoryInterface } from '../repository/repository.interface';
import { UserRegistrationInput } from '../requests/users/user.registration.input';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserRegistrationResponse } from '../responses/users/user.registration.response';
import { UserLoginResponse } from '../responses/users/user.login.response';
import { ArgumentValidationError } from 'type-graphql';
import { ValidationError } from 'class-validator';
import { createValidationErrors } from '../validations/helpers';

@Service({ global: true })
export default class UserService {
  private userRepository;
  // @ts-ignore
  constructor(@Repository(User) private userRepository: RepositoryInterface) {

  }

  async getAll() {
    return this.userRepository.find();
  }

  async add(data: UserRegistrationInput) {
    return this.createUser(data);
  }

  private async createUser(userData: Partial<User>): Promise<UserRegistrationResponse> {
    const { name, email, password, imageUrl } = userData;
    const user = {
      name,
      email,
      imageUrl,
      password: await hash(password, 10),
    };
    const { name: userName, email: userEmail, id } = await this.userRepository.save(user);
    return {
      id,
      name: userName,
      email: userEmail,
      image_url: imageUrl,
    };
  }

  async logInUser({ email, password }): Promise<UserLoginResponse> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new ArgumentValidationError(
      createValidationErrors('email',
                             ['No associated users with specified email'],
       ));
    }

    const { id, password: hashedPassword } = user;

    const verify = await compare(password, hashedPassword);

    if (!verify) {
      throw new ArgumentValidationError(
          createValidationErrors('password',
                                 ['Passwords do not match'],
          ));
    }

    return {
      id,
      token: sign({ userId: id }, 'jwtsecret', { expiresIn: '60m' }),
    };
  }

  async getUserByEmail(email): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUserById(id): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getRandomUser(limit = 1): Promise<User[]> {
    return this.userRepository.query(`
    SELECT * FROM user ORDER BY RAND() LIMIT ${limit}
    `) as User[];
  }
}
