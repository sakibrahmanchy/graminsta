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
const Reaction_1 = require("../entity/Reaction");
let ReactionService = class ReactionService {
    // @ts-ignore
    constructor(reactionService) {
        this.reactionService = reactionService;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.reactionService.find();
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createReaction(data);
        });
    }
    createReaction(reactionData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.reactionService.save(reactionData);
        });
    }
};
ReactionService = __decorate([
    typedi_1.Service({ global: true }),
    __param(0, repository_1.default(Reaction_1.Reaction)),
    __metadata("design:paramtypes", [Object])
], ReactionService);
exports.default = ReactionService;
//# sourceMappingURL=reaction.service.js.map