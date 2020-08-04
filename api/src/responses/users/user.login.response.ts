import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class UserLoginResponse {
  @Field(() => ID)
    id?: number;

  @Field()
    token?: string;

  @Field()
    success?: boolean;

  @Field()
    errors?: any[];
}
