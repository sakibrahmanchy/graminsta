import { Service, Inject } from 'typedi';
import Repository from '../repository/repository';
import { Reaction } from '../entity/Reaction';

@Service({ global: true })
export default class ReactionService {
  private reactionService;

  /**
   * Inject reactionRepo for reaction control.
   * @param reactionService
   */
  // @ts-ignore
  constructor(@Repository(Reaction) private reactionService: RepositoryInterface) {
  }

  /**
   * List
   */
  async getAll() {
    return this.reactionService.find();
  }

  /**
   * Create reaction.
   * @param data
   */
  async add(data: Partial<Reaction>) {
    return this.reactionService.save(data);
  }
}
