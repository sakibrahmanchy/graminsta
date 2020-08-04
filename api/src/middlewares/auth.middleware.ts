import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Container } from 'typedi';
import { User } from '../entity/User';
import { createValidationErrors } from '../validations/helpers';

/**
 * Auth middleware that verifies the authorization token. Auth header token is parsed from passed
 * request on Context.
 *
 * @param request
 */
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
    response.json(
      createValidationErrors('auth', ['Authorization failed']),
    );
  }
};
