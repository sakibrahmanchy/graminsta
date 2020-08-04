import {Body, Controller, CurrentUser, Get, Post, QueryParam, Req} from 'routing-controllers';
import PostService from '../services/post.service';
import {PostAddInput} from '../requests/posts/post.add.input';

@Controller('/posts')
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Get()
    async posts(@CurrentUser({ required: true }) user,
                @QueryParam('user_id') userId: string,
                @QueryParam('take') take: number,
                @QueryParam('skip') skip: number,
                @QueryParam('keyword') keyword: string,
  ) {
    return this.postService.getAll({ take, skip, keyword, userId });
  }

  @Post()
    async add(@CurrentUser({ required: true }) user,
              @Body({ validate: true }) input: PostAddInput) {
    return this.postService.add(input);
  }
}
