import { InputType, Field } from 'type-graphql';

import { IsNotEmpty } from 'class-validator';
import { Post } from '../../entity/Post';

@InputType()
export class PostAddInput implements Partial<Post> {
  @Field({ nullable: false })
  @IsNotEmpty({ message: 'Please provide some contents for the post.' })
    content: string;
}
