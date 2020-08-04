import {
  Body,
  Controller,
  CurrentUser,
  Get,
  Param,
  Post,
  QueryParam,
} from 'routing-controllers';
import PostService from '../services/post.service';
import { PostAddInput } from '../requests/posts/post.add.input';

/**
 * Controller for post, reactions etc.
 */
@Controller()
export class PostController {
  /**
   * Injecting PostService for handling posts, reactions.
   * @param postService
   */
  constructor(private readonly postService: PostService) {
  }

  /**
   * List posts, with reactions, paginate, search, query etc.
   * @param user
   * @param userId
   * @param take
   * @param skip
   * @param keyword
   */
  @Get('/posts')
    async posts(@CurrentUser({ required: true }) user,
                @QueryParam('user_id') userId: string,
                @QueryParam('take') take: number,
                @QueryParam('skip') skip: number,
                @QueryParam('keyword') keyword: string,
  ) {
    return this.postService.getAll({ take, skip, keyword, userId });
  }

  /**
   * Get individual post by post id.
   * @param user
   * @param postId
   */
  @Get('/posts/:id')
  async post(@CurrentUser({ required: true }) user,
             @Param('id') postId: string,
  ) {
    return this.postService.getPost(postId);
  }

  /**
   * Save a post by providing post data. Image will be auto generated for now.
   * @param user
   * @param input
   */
  @Post('/posts')
    async add(@CurrentUser({ required: true }) user,
              @Body({ validate: true }) input: PostAddInput) {
    return this.postService.add(input);
  }
}
