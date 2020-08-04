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
exports.PostController = void 0;
const routing_controllers_1 = require("routing-controllers");
const post_service_1 = __importDefault(require("../services/post.service"));
const post_add_input_1 = require("../requests/posts/post.add.input");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    posts(user, userId, take, skip, keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postService.getAll({ take, skip, keyword, userId });
        });
    }
    add(user, input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postService.add(input);
        });
    }
};
__decorate([
    routing_controllers_1.Get(),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __param(1, routing_controllers_1.QueryParam('user_id')),
    __param(2, routing_controllers_1.QueryParam('take')),
    __param(3, routing_controllers_1.QueryParam('skip')),
    __param(4, routing_controllers_1.QueryParam('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "posts", null);
__decorate([
    routing_controllers_1.Post(),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __param(1, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, post_add_input_1.PostAddInput]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "add", null);
PostController = __decorate([
    routing_controllers_1.Controller('/posts'),
    __metadata("design:paramtypes", [post_service_1.default])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map