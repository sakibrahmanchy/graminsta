import { Repository } from 'typeorm';

/**
 * Custom Interface to implement repository
 */
export interface RepositoryInterface {
  getRepository(entity): Repository<any>;
}
