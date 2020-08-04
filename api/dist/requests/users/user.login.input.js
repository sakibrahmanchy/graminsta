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
exports.UserLoginInput = void 0;
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
let UserLoginInput = class UserLoginInput {
};
__decorate([
    type_graphql_1.Field(),
    class_validator_1.MinLength(8, { message: 'Password should be minimum eight characters.' }),
    class_validator_1.IsNotEmpty({ message: 'Enter a password for authentication.' }),
    __metadata("design:type", String)
], UserLoginInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.IsEmail({}, { message: 'Invalid email format. Make sure you are using a correct email.' }),
    class_validator_1.IsNotEmpty({ message: 'Please enter your email so that we can recognize you later.' }),
    __metadata("design:type", String)
], UserLoginInput.prototype, "email", void 0);
UserLoginInput = __decorate([
    type_graphql_1.InputType()
], UserLoginInput);
exports.UserLoginInput = UserLoginInput;
//# sourceMappingURL=user.login.input.js.map