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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleWare = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entity/User");
const helpers_1 = require("../validations/helpers");
const typedi_1 = require("typedi");
/**
 * Auth middleware that verifies the authorization token. Auth header token is parsed from passed
 * request on Context.
 *
 * @param request
 */
// eslint-disable-next-line import/prefer-default-export
exports.authMiddleWare = ({ request, response }) => __awaiter(void 0, void 0, void 0, function* () {
    const { headers: { authorization: token = '', } = {}, } = request;
    try {
        // Try to verify the given token with secret
        const { userId } = jsonwebtoken_1.verify(token.split(' ')[1], 'jwtsecret');
        const user = yield typeorm_1.getRepository(User_1.User).findOne({ where: { id: userId } });
        if (user) {
            typedi_1.Container.set('user', user);
        }
        return user;
    }
    catch (e) {
        // Verification false, abort
        throw new type_graphql_1.ArgumentValidationError(helpers_1.createValidationErrors('auth', ['Authorization failed']));
    }
});
//# sourceMappingURL=auth.middleware.js.map