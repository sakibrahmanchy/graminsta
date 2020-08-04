import { RepositoryInterface } from './repository.interface';
import { Repository, getRepository } from 'typeorm';

/**
 * Repository manager to get repository based on entity.
 */
export class RepositoryManager implements RepositoryInterface {
  private entity;
  constructor(entity) {
    this.entity = entity;
  }
  getRepository(): Repository<any> {
    return getRepository(this.entity);
  }
}
