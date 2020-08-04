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
const post_photos_1 = require("../data/post.photos");
const Photo_1 = require("../entity/Photo");
const repository_1 = __importDefault(require("../repository/repository"));
const helpers_1 = require("../helpers/helpers");
let PhotoService = class PhotoService {
    // @ts-ignore
    constructor(photoRepository) {
        this.photoRepository = photoRepository;
    }
    getAndSaveRandomPhoto() {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, thumb_url } = this.getPhotoUrl();
            const photo = new Photo_1.Photo();
            photo.url = url;
            photo.thumbUrl = thumb_url;
            return this.photoRepository.save(photo);
        });
    }
    getPhotoUrl() {
        const randomPhotoIndex = helpers_1.getRandomIntegerNumberInRange(0, 900);
        const randomPhotoId = post_photos_1.POST_PHOTOS[randomPhotoIndex];
        return {
            url: `https://picsum.photos/id/${randomPhotoId}`,
            thumb_url: `https://picsum.photos/id/${randomPhotoId}/500/750`,
        };
    }
};
PhotoService = __decorate([
    typedi_1.Service({ global: true }),
    __param(0, repository_1.default(Photo_1.Photo)),
    __metadata("design:paramtypes", [Object])
], PhotoService);
exports.default = PhotoService;
//# sourceMappingURL=photo.service.js.map