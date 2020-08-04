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
const user_service_1 = __importDefault(require("./user.service"));
const photo_service_1 = __importDefault(require("./photo.service"));
const post_service_1 = __importDefault(require("./post.service"));
const faker_1 = __importDefault(require("faker"));
const helpers_1 = require("../helpers/helpers");
const reaction_service_1 = __importDefault(require("./reaction.service"));
const Reaction_1 = require("../entity/Reaction");
let FakerService = class FakerService {
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    constructor(userService, photoService, postService, reactionService) {
        this.userService = userService;
        this.photoService = photoService;
        this.postService = postService;
        this.reactionService = reactionService;
    }
    printSeparators() {
        this.log('-------------------------------------------------------------------');
    }
    log(message) {
        console.log(message);
    }
    createFakeReactionsForPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            let likeCounts = helpers_1.getRandomIntegerNumberInRange(1, 50);
            let commentCounts = helpers_1.getRandomIntegerNumberInRange(1, 30);
            const lineCount = helpers_1.getRandomIntegerNumberInRange(1, 3);
            const post = yield this.postService.findById(postId);
            if (!post) {
                throw new Error('Invalid post Id');
            }
            const [user] = yield this.userService.getRandomUser();
            if (!user) {
                throw new Error('User not found for reaction');
            }
            this.log('Creating likes');
            while (likeCounts > 0) {
                yield this.reactionService.add({
                    post,
                    user,
                    content: '',
                    type: Reaction_1.Type.LIKE,
                });
                likeCounts -= 1;
            }
            this.printSeparators();
            this.log('Creating Comments');
            while (commentCounts > 0) {
                yield this.reactionService.add({
                    post,
                    user,
                    content: faker_1.default.lorem.lines(lineCount),
                    type: Reaction_1.Type.COMMENT,
                });
                commentCounts -= 1;
            }
        });
    }
    createFakePostsForUser(userId, postCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserById(userId);
            if (!user) {
                throw new Error('Invalid User Id');
            }
            let count = 0;
            while (count !== postCount) {
                this.printSeparators();
                this.log('New Post Creating');
                const postData = {
                    content: faker_1.default.lorem.paragraphs(2),
                };
                const post = yield this.postService.add(postData, user);
                this.log('Post created with following data:');
                this.log(postData);
                this.printSeparators();
                this.log('Creating fake reactions for post');
                this.createFakeReactionsForPost(post.id);
                count += 1;
            }
        });
    }
    createFakeUser(postCount = 0, data = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, email } = yield this.userService.add(data !== null && data !== void 0 ? data : {
                name: faker_1.default.name.findName(),
                password: 'fakepass',
                email: faker_1.default.internet.email(),
                imageUrl: faker_1.default.image.avatar(),
            });
            this.printSeparators();
            this.log('New user created with following data:');
            this.log({ id, name, email });
            this.printSeparators();
            let randomPostCount = 0;
            if (!postCount) {
                randomPostCount = helpers_1.getRandomIntegerNumberInRange(1, 100);
            }
            this.log(`Creating ${postCount} fake posts for user: ${name}`);
            this.createFakePostsForUser(id, postCount !== null && postCount !== void 0 ? postCount : randomPostCount);
        });
    }
    generateFakeData({ usersCount = 20, postCountPerUser = 30 }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUserCount = (yield this.userService.getAll()).length || 0;
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
                imageUrl: faker_1.default.image.avatar(),
            });
            count += 1;
            while (count !== usersCount) {
                const user = yield this.createFakeUser(postCountPerUser);
                users = [...users, user];
                count += 1;
            }
            this.printSeparators();
            this.log('Fake data has been created.');
        });
    }
};
FakerService = __decorate([
    typedi_1.Service({ global: true }),
    __metadata("design:paramtypes", [user_service_1.default, photo_service_1.default, post_service_1.default, reaction_service_1.default])
], FakerService);
exports.default = FakerService;
//# sourceMappingURL=faker.service.js.map