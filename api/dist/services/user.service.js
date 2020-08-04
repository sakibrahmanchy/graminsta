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
const User_1 = require("../entity/User");
const repository_1 = __importDefault(require("../repository/repository"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const type_graphql_1 = require("type-graphql");
const helpers_1 = require("../validations/helpers");
let UserService = class UserService {
    // @ts-ignore
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find();
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createUser(data);
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, imageUrl } = userData;
            const user = {
                name,
                email,
                imageUrl,
                password: yield bcryptjs_1.hash(password, 10),
            };
            const { name: userName, email: userEmail, id } = yield this.userRepository.save(user);
            return {
                id,
                name: userName,
                email: userEmail,
                image_url: imageUrl,
            };
        });
    }
    logInUser({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserByEmail(email);
            if (!user) {
                throw new type_graphql_1.ArgumentValidationError(helpers_1.createValidationErrors('email', ['No associated users with specified email']));
            }
            const { id, password: hashedPassword } = user;
            const verify = yield bcryptjs_1.compare(password, hashedPassword);
            if (!verify) {
                throw new type_graphql_1.ArgumentValidationError(helpers_1.createValidationErrors('password', ['Passwords do not match']));
            }
            return {
                id,
                token: jsonwebtoken_1.sign({ userId: id }, 'jwtsecret', { expiresIn: '60m' }),
            };
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { email } });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { id } });
        });
    }
    getRandomUser(limit = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.query(`
    SELECT * FROM user ORDER BY RAND() LIMIT ${limit}
    `);
        });
    }
};
UserService = __decorate([
    typedi_1.Service({ global: true }),
    __param(0, repository_1.default(User_1.User)),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user.service.js.map