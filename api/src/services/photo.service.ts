import { Service } from 'typedi';
import { POST_PHOTOS } from '../data/post.photos';
import { Photo } from '../entity/Photo';
import Repository from '../repository/repository';
import { RepositoryInterface } from '../repository/repository.interface';
import { getRandomIntegerNumberInRange } from '../helpers/helpers';

@Service({ global: true })
export default class PhotoService {
  private photoRepository;

  /**
   * Injecting photo repository using custom repository manager.
   * @param photoRepository
   */
  // @ts-ignore
  constructor(@Repository(Photo) private photoRepository: RepositoryInterface) {
  }

  /**
   * Generate and save a random photo url
   */
  async getAndSaveRandomPhoto() {
    const { url, thumb_url } = this.getPhotoUrl();

    const photo = new Photo();
    photo.url = url;
    photo.thumbUrl = thumb_url;
    return this.photoRepository.save(photo);
  }

  /**
   * Generate random urls.
   */
  getPhotoUrl() {
    const randomPhotoIndex = getRandomIntegerNumberInRange(0, 900);
    const randomPhotoId = POST_PHOTOS[randomPhotoIndex];
    return {
      url: `https://picsum.photos/id/${randomPhotoId}/1024`,
      thumb_url: `https://picsum.photos/id/${randomPhotoId}/500/750`,
    };
  }
}
