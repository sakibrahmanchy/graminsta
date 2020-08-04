import { InputType, Field } from 'type-graphql';

import { IsNotEmpty } from 'class-validator';
import { Reaction, Type } from '../../entity/Reaction';

@InputType()
export class ReactionAddInput implements Partial<Reaction> {
  @Field({ nullable: false })
  @IsNotEmpty({ message: 'Please provide some type for the reaction.' })
    type: Type;
}
