"use strict";
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
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const class_validator_1 = require("class-validator");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const faker_service_1 = __importDefault(require("./services/faker.service"));
const User_1 = require("./entity/User");
const Post_1 = require("./entity/Post");
const Photo_1 = require("./entity/Photo");
// its important to set container before any operation you do with routing-controllers,
// including importing controllers
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(cors_1.default());
    app.use(helmet_1.default());
    app.use(body_parser_1.default.json());
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../', 'build')));
    app.use(express_1.default.static('public'));
    routing_controllers_1.useContainer(typedi_1.Container);
    class_validator_1.useContainer(typedi_1.Container);
    yield typeorm_1.createConnection({
        name: 'default',
        type: 'mysql',
        host: 'database',
        port: 3306,
        username: 'root',
        password: 'myrootpassword',
        database: 'graminsta',
        synchronize: true,
        entities: [`${__dirname}/entity/*.js`]
    });
    // create and run server
    routing_controllers_1.useExpressServer(app, {
        defaultErrorHandler: false,
        controllers: [`${__dirname}/controllers/*.js`],
        middlewares: [`${__dirname}/middlewares/*.js`],
        currentUserChecker: auth_middleware_1.authMiddleWare,
    });
    app.listen(8078, () => {
        console.log('Listening on port 8078');
    });
    typedi_1.Container.set('user', User_1.User);
    typedi_1.Container.set('post', Post_1.Post);
    typedi_1.Container.set('photo', Photo_1.Photo);
    const fakerService = typedi_1.Container.get(faker_service_1.default);
    yield fakerService.generateFakeData({});
}))();
//# sourceMappingURL=index.js.map