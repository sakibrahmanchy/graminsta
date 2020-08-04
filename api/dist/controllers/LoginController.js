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
exports.LoginController = void 0;
const routing_controllers_1 = require("routing-controllers");
const user_service_1 = __importDefault(require("../services/user.service"));
const user_registration_input_1 = require("../requests/users/user.registration.input");
const user_login_input_1 = require("../requests/users/user.login.input");
let LoginController = class LoginController {
    constructor(userService) {
        this.userService = userService;
    }
    // tslint:disable-next-line:no-empty
    dashboard() {
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.add(user);
        });
    }
    logUserIn(credentials, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // if (req.accepts(['html', 'json']) === 'json') {
                return this.userService.logInUser(credentials);
                // }
                // res.redirect('/dashboard');
            }
            catch (e) {
                res.redirect('/login');
            }
        });
    }
};
__decorate([
    routing_controllers_1.Get('/log'),
    routing_controllers_1.Render('login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "dashboard", null);
__decorate([
    routing_controllers_1.Post('/register'),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_registration_input_1.UserRegistrationInput]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "addUser", null);
__decorate([
    routing_controllers_1.Post('/login'),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __param(1, routing_controllers_1.Req()),
    __param(2, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_input_1.UserLoginInput, Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "logUserIn", null);
LoginController = __decorate([
    routing_controllers_1.Controller(),
    __metadata("design:paramtypes", [user_service_1.default])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=LoginController.js.map