import { IsNotEmpty } from 'class-validator';
import { Post } from '../../entity/Post';

export class PostAddInput implements Partial<Post> {
  @IsNotEmpty({ message: 'Please provide some contents for the post.' })
    content: string;
}
