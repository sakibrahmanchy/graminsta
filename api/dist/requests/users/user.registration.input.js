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
exports.UserRegistrationInput = void 0;
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const email_exists_1 = require("../../validations/email-exists");
let UserRegistrationInput = class UserRegistrationInput {
};
__decorate([
    type_graphql_1.Field({ nullable: false }),
    class_validator_1.IsNotEmpty({ message: 'Please provide your name.' }),
    __metadata("design:type", String)
], UserRegistrationInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.MinLength(8, { message: 'Password should be minimum eight characters.' }),
    class_validator_1.IsNotEmpty({ message: 'Enter a password for authentication.' }),
    __metadata("design:type", String)
], UserRegistrationInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.IsEmail({}, { message: 'Invalid email format. Make sure you are using a correct email.' }),
    class_validator_1.IsNotEmpty({ message: 'Please enter your email so that we can recognize you later.' }),
    email_exists_1.emailAlreadyExists({ message: 'Email already exists. Please use another one.' }),
    __metadata("design:type", String)
], UserRegistrationInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegistrationInput.prototype, "imageUrl", void 0);
UserRegistrationInput = __decorate([
    type_graphql_1.InputType()
], UserRegistrationInput);
exports.UserRegistrationInput = UserRegistrationInput;
//# sourceMappingURL=user.registration.input.js.map