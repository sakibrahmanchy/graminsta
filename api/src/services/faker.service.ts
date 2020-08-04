import { Service } from 'typedi';
import UserService from './user.service';
import PhotoService from './photo.service';
import PostService from './post.service';
import faker from 'faker';
import { getRandomIntegerNumberInRange } from '../helpers/helpers';
import ReactionService from './reaction.service';
import { Type } from '../entity/Reaction';
import { Post } from '../entity/Post';

@Service({ global: true })
export default class FakerService {
  private userService: UserService;
  private photoService: PhotoService;
  private postService: PostService;
  private reactionService: ReactionService;
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, private photoService: PhotoService, private postService: PostService, private reactionService: ReactionService) {
  }

  printSeparators() {
    this.log('-------------------------------------------------------------------');
  }

  log(message) {
    console.log(message);
  }

  async createFakeReactionsForPost(postId) {
    let likeCounts = getRandomIntegerNumberInRange(1, 50);
    let commentCounts = getRandomIntegerNumberInRange(1, 30);
    const lineCount = getRandomIntegerNumberInRange(1, 3);

    const post: Post = await this.postService.findById(postId);
    if (!post) {
      throw new Error('Invalid post Id');
    }

    const [user] = await this.userService.getRandomUser();

    if (!user) {
      throw new Error('User not found for reaction');
    }
    this.log('Creating likes');
    while (likeCounts > 0) {
      await this.reactionService.add({
        post,
        user,
        content: '',
        type: Type.LIKE,
      });
      likeCounts -= 1;
    }
    this.printSeparators();
    this.log('Creating Comments');

    while (commentCounts > 0) {
      await this.reactionService.add({
        post,
        user,
        content: faker.lorem.lines(lineCount),
        type: Type.COMMENT,
      });
      commentCounts -= 1;
    }
  }

  async createFakePostsForUser(userId, postCount) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error('Invalid User Id');
    }

    let count = 0;
    while (count !== postCount) {
      this.printSeparators();
      this.log('New Post Creating');
      const postData = {
        content: faker.lorem.paragraphs(2),
      };
      const post = await this.postService.add(postData, user);
      this.log('Post created with following data:');
      this.log(postData);
      this.printSeparators();
      this.log('Creating fake reactions for post');
      this.createFakeReactionsForPost(post.id);
      count += 1;
    }

  }

  async createFakeUser(postCount = 0, data = null) {
    const { id, name, email } = await this.userService.add(data ?? {
      name: faker.name.findName(),
      password: 'fakepass',
      email: faker.internet.email(),
      imageUrl: faker.image.avatar(),
    });

    this.printSeparators();
    this.log('New user created with following data:');
    this.log({ id, name, email });
    this.printSeparators();

    let randomPostCount = 0;
    if (!postCount) {
      randomPostCount = getRandomIntegerNumberInRange(1, 100);
    }

    this.log(`Creating ${postCount} fake posts for user: ${name}`);
    this.createFakePostsForUser(id, postCount ?? randomPostCount);
  }

  async generateFakeData({ usersCount = 20, postCountPerUser = 30 }) {
    const currentUserCount = (await this.userService.getAll()).length || 0;

    if (currentUserCount >= usersCount) {
      console.log('Enough fake data exists. Quitting faker service........');
      return;
    }

    let count = 0;
    let users = [];
    this.log('Generating fake data');
    this.printSeparators();
    this.log(`${usersCount} fake users are being created`);
    // Create a mock user for simplicity
    this.createFakeUser(30, {
      name: 'Mock User',
      password: 'mockuser',
      email: 'mockuser@graminsta.com',
      imageUrl: faker.image.avatar(),
    });
    count += 1;
    while (count !== usersCount) {
      const user = await this.createFakeUser(postCountPerUser);
      users = [...users, user];
      count += 1;
    }
    this.printSeparators();
    this.log('Fake data has been created.');
  }
}
