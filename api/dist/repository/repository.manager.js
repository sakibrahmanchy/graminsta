"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryManager = void 0;
const typeorm_1 = require("typeorm");
class RepositoryManager {
    constructor(entity) {
        this.entity = entity;
    }
    getRepository() {
        return typeorm_1.getRepository(this.entity);
    }
}
exports.RepositoryManager = RepositoryManager;
//# sourceMappingURL=repository.manager.js.map