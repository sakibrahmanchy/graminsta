"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const repository_1 = __importDefault(require("../repository/repository"));
const Post_1 = require("../entity/Post");
const photo_service_1 = __importDefault(require("./photo.service"));
const typeorm_1 = require("typeorm");
const Reaction_1 = require("../entity/Reaction");
let PostService = class PostService {
    // @ts-ignore
    // @ts-ignore
    constructor(postRepository, photoService) {
        this.postRepository = postRepository;
        this.photoService = photoService;
        this.user = typedi_1.Container.get('user');
    }
    getAll({ take = 10, skip = 0, keyword = '', userId = null }) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = [
                { content: typeorm_1.Like(`%${keyword}%`) },
            ];
            if (userId) {
                where = [{ user: { id: userId } }];
            }
            const [posts, count] = yield this.postRepository.findAndCount({
                take,
                skip,
                where,
                order: { id: 'DESC' },
            });
            const postsUpdated = yield posts.reduce((acc = [], post) => __awaiter(this, void 0, void 0, function* () {
                const photos = yield this.postRepository
                    .createQueryBuilder()
                    .relation(Post_1.Post, 'photos')
                    .of(post)
                    .loadMany();
                const user = yield this.postRepository
                    .createQueryBuilder()
                    .relation(Post_1.Post, 'user')
                    .of(post)
                    .loadOne();
                const [{ likes }] = yield this.postRepository
                    .query(`SELECT count(post.id) AS likes
            FROM post
                     LEFT JOIN reaction reaction ON reaction.postId = post.id
            WHERE post.id = ?
              AND reaction.type = ?`, [post.id, Reaction_1.Type.LIKE]);
                const [{ comments }] = yield this.postRepository
                    .query(`SELECT count(post.id) AS comments
            FROM post
                     LEFT JOIN reaction reaction ON reaction.postId = post.id
            WHERE post.id = ?
              AND reaction.type = ?`, [post.id, Reaction_1.Type.COMMENT]);
                const resolved = yield acc;
                return [
                    ...resolved,
                    Object.assign(Object.assign({}, post), { photos,
                        user, comments: Number(comments), likes: Number(likes) }),
                ];
            }), []);
            return { count, posts: postsUpdated };
        });
    }
    getUserPosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postRepository.find({
                where: {
                    userId,
                },
                relations: ['photos', 'user'],
            });
        });
    }
    add(data, fakeUser = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createPost(data, fakeUser);
        });
    }
    createPost(postData, fakeUser = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content } = postData;
            const photo = yield this.photoService.getAndSaveRandomPhoto();
            const post = {
                content,
                photos: [photo],
                user: fakeUser !== null && fakeUser !== void 0 ? fakeUser : this.user,
            };
            return this.postRepository.save(post);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postRepository.findOne({ where: { id } });
        });
    }
};
PostService = __decorate([
    typedi_1.Service({ global: true }),
    __param(0, repository_1.default(Post_1.Post)),
    __metadata("design:paramtypes", [Object, photo_service_1.default])
], PostService);
exports.default = PostService;
//# sourceMappingURL=post.service.js.map