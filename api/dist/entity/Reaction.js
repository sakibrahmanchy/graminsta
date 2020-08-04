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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reaction = exports.Type = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("./Post");
const User_1 = require("./User");
var Type;
(function (Type) {
    Type[Type["LIKE"] = 1] = "LIKE";
    Type[Type["COMMENT"] = 2] = "COMMENT";
})(Type = exports.Type || (exports.Type = {}));
let Reaction = class Reaction {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", Number)
], Reaction.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Reaction.prototype, "content", void 0);
__decorate([
    typeorm_1.Column('enum', { name: 'type', enum: Type }),
    __metadata("design:type", Number)
], Reaction.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Post_1.Post, post => post.reactions),
    __metadata("design:type", Post_1.Post)
], Reaction.prototype, "post", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.User, user => user.reactions),
    __metadata("design:type", User_1.User)
], Reaction.prototype, "user", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Reaction.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Reaction.prototype, "updatedAt", void 0);
Reaction = __decorate([
    typeorm_1.Entity()
], Reaction);
exports.Reaction = Reaction;
//# sourceMappingURL=Reaction.js.map