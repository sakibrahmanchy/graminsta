import { Repository } from 'typeorm';
export interface RepositoryInterface {
  getRepository(entity): Repository<any>;
}
