import { RepositoryInterface } from './repository.interface';
import { Repository, getRepository } from 'typeorm';

export class RepositoryManager implements RepositoryInterface {
  private entity;
  constructor(entity) {
    this.entity = entity;
  }
  getRepository(): Repository<any> {
    return getRepository(this.entity);
  }
}
