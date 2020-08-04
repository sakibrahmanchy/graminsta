import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class UserRegistrationResponse {
  @Field(() => ID)
    id: number;

  @Field()
    name: string;

  @Field()
    email: string;
}
