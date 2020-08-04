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
exports.emailDoesNotExist = exports.EmailDoesNotExistConstraint = void 0;
const class_validator_1 = require("class-validator");
const typedi_1 = require("typedi");
const user_service_1 = __importDefault(require("../services/user.service"));
let EmailDoesNotExistConstraint = class EmailDoesNotExistConstraint {
    constructor(userService) {
        this.userService = userService;
    }
    validate(email, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this.userService.getUserByEmail(email));
        });
    }
};
EmailDoesNotExistConstraint = __decorate([
    typedi_1.Service(),
    class_validator_1.ValidatorConstraint({ async: true }),
    __metadata("design:paramtypes", [user_service_1.default])
], EmailDoesNotExistConstraint);
exports.EmailDoesNotExistConstraint = EmailDoesNotExistConstraint;
function emailDoesNotExist(validationOptions) {
    return (object, propertyName) => {
        class_validator_1.registerDecorator({
            propertyName,
            target: object.constructor,
            options: validationOptions,
            constraints: [],
            validator: EmailDoesNotExistConstraint,
        });
    };
}
exports.emailDoesNotExist = emailDoesNotExist;
//# sourceMappingURL=email-does-not-exist.js.map