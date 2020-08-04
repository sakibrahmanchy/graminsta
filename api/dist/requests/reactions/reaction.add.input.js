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
exports.ReactionAddInput = void 0;
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const Reaction_1 = require("../../entity/Reaction");
let ReactionAddInput = class ReactionAddInput {
};
__decorate([
    type_graphql_1.Field({ nullable: false }),
    class_validator_1.IsNotEmpty({ message: 'Please provide some type for the reaction.' }),
    __metadata("design:type", Number)
], ReactionAddInput.prototype, "type", void 0);
ReactionAddInput = __decorate([
    type_graphql_1.InputType()
], ReactionAddInput);
exports.ReactionAddInput = ReactionAddInput;
//# sourceMappingURL=reaction.add.input.js.map