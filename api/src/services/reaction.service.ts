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
import { createValidationErrors } from '../validations/helpers';
import { Reaction } from '../entity/Reaction';

@Service({ global: true })
export default class ReactionService {
  private reactionService;
  // @ts-ignore
  constructor(@Repository(Reaction) private reactionService: RepositoryInterface) {
  }

  async getAll() {
    return this.reactionService.find();
  }

  async add(data: Partial<Reaction>) {
    return this.createReaction(data);
  }

  private async createReaction(reactionData: Partial<Reaction>) {
    return this.reactionService.save(reactionData);
  }
}
