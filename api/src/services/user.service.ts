import { Service, Inject } from 'typedi';
import { User } from '../entity/User';
import Repository from '../repository/repository';
import { RepositoryInterface } from '../repository/repository.interface';
import { UserRegistrationInput } from '../requests/users/user.registration.input';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserRegistrationResponse } from '../responses/users/user.registration.response';
import { UserLoginResponse } from '../responses/users/user.login.response';
import { ValidationError } from 'class-validator';
import { createValidationErrors } from '../validations/helpers';

@Service({ global: true })
export default class UserService {
  private userRepository;

  /**
   * Injecting userRepo for user handle
   * @param userRepository
   */
  // @ts-ignore
  constructor(@Repository(User) private userRepository: RepositoryInterface) {

  }

  /**
   * List all users
   */
  async getAll() {
    return this.userRepository.find();
  }

  /**
   * Register new user
   * @param data
   */
  async add(data: UserRegistrationInput) {
    return this.createUser(data);
  }

  /**
   * Create user data using registration inputs.
   * @param userData
   */
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

  /**
   * Log user in using credentials
   * @param email
   * @param password
   */
  async logInUser({ email, password }): Promise<UserLoginResponse | ValidationError[]> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      return (
      createValidationErrors('email',
                             ['No associated users with specified email'],
       ));
    }

    const { id, password: hashedPassword } = user;

    const verify = await compare(password, hashedPassword);

    if (!verify) {
      return createValidationErrors('password',
                                    ['Passwords do not match'],
      );
    }

    return {
      id,
      token: sign({ userId: id }, 'jwtsecret', { expiresIn: '60m' }),
    };
  }

  /**
   * Get user By email
   * @param email
   */
  async getUserByEmail(email): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Get user by user id
   * @param id
   */
  async getUserById(id): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  /**
   * Get random user from database
   * @param limit
   */
  async getRandomUser(limit = 1): Promise<User[]> {
    return this.userRepository.query(`
    SELECT * FROM user ORDER BY RAND() LIMIT ${limit}
    `) as User[];
  }
}
