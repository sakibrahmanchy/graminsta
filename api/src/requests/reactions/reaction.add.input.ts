import { IsNotEmpty } from 'class-validator';
import { Reaction, Type } from '../../entity/Reaction';

export class ReactionAddInput implements Partial<Reaction> {
  @IsNotEmpty({ message: 'Please provide some type for the reaction.' })
    type: Type;
}
