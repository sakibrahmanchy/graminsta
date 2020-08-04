import { Service, Inject, Container } from 'typedi';
import Repository from '../repository/repository';
import { RepositoryInterface } from '../repository/repository.interface';
import { Post } from '../entity/Post';
import { PostAddInput } from '../requests/posts/post.add.input';
import PhotoService from './photo.service';
import { User } from '../entity/User';
import { Photo } from '../entity/Photo';
import { Like } from 'typeorm';
import { Type } from '../entity/Reaction';

@Service({ global: true })
export default class PostService {
  private postRepository;
  private user: User;
  // @ts-ignore
  // @ts-ignore
  constructor(@Repository(Post) private postRepository: RepositoryInterface,
              private photoService: PhotoService,
  ) {
    this.user = Container.get('user');
  }

  async getAll({ take = 10, skip = 0, keyword = '', userId = null }) {
    let where = [
      { content: Like(`%${keyword}%`) },
    ];

    if (userId) {
      where = [{ user: { id: userId } } as any];
    }

    const [posts, count] =  await this.postRepository.findAndCount({
      take,
      skip,
      where,
      order: { id: 'DESC' },
    });
    const postsUpdated = await posts.reduce(async (acc = [], post) => {
      const photos = await this.postRepository
                      .createQueryBuilder()
                      .relation(Post, 'photos')
                      .of(post)
                      .loadMany();

      const user = await this.postRepository
          .createQueryBuilder()
          .relation(Post, 'user')
          .of(post)
          .loadOne();

      const [{ likes }] = await this.postRepository
          .query(`SELECT count(post.id) AS likes
            FROM post
                     LEFT JOIN reaction reaction ON reaction.postId = post.id
            WHERE post.id = ?
              AND reaction.type = ?`, [ post.id, Type.LIKE ]);

      const [{ comments }] = await this.postRepository
          .query(`SELECT count(post.id) AS comments
            FROM post
                     LEFT JOIN reaction reaction ON reaction.postId = post.id
            WHERE post.id = ?
              AND reaction.type = ?`, [ post.id, Type.COMMENT ]);

      const resolved = await acc;

      return [
        ...resolved,
        {
          ...post,
          photos,
          user,
          comments: Number(comments),
          likes: Number(likes),
        },
      ];
    },                                      []);
    return { count, posts: postsUpdated };
  }

  async getUserPosts(userId) {
    return this.postRepository.find({
      where: {
        userId,
      },
      relations: ['photos', 'user'],
    });
  }

  async add(data: PostAddInput, fakeUser: User = null) {
    return this.createPost(data, fakeUser);
  }

  private async createPost(postData: Partial<Post>, fakeUser = null) {
    const { content } = postData;
    const photo: Photo = await this.photoService.getAndSaveRandomPhoto();

    const post = {
      content,
      photos: [photo],
      user: fakeUser ?? this.user,
    };
    return this.postRepository.save(post);
  }

  async findById(id: number) {
    return this.postRepository.findOne({ where: { id } });
  }
}
