import Container from 'typedi';
import { RepositoryManager } from './repository.manager';

// tslint:disable-next-line:function-name
export default function Repository(entity) {
  return async (object, propertyName: string, index?: number) => {
    const repositoryManager = new RepositoryManager(entity);
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: containerInstance => repositoryManager.getRepository(),
    });
  };
}
