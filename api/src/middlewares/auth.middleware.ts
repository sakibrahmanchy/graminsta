import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { ArgumentValidationError } from 'type-graphql';
import { User } from '../entity/User';
import { createValidationErrors } from '../validations/helpers';
import {Container} from 'typedi';

/**
 * Auth middleware that verifies the authorization token. Auth header token is parsed from passed
 * request on Context.
 *
 * @param request
 */
// eslint-disable-next-line import/prefer-default-export
export const authMiddleWare = async ({ request, response }) => {
  const {
    headers: {
      authorization: token = '',
    } = {},
  } = request;
  try {
    // Try to verify the given token with secret

    const { userId }: any = verify(token.split(' ')[1], 'jwtsecret');
    const user = await getRepository(User).findOne({ where: { id: userId } });
    if (user) {
      Container.set('user', user);
    }
    return user;
  } catch (e) {
    // Verification false, abort
    throw new ArgumentValidationError(
      createValidationErrors('auth', ['Authorization failed']),
    );
  }
};
