"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _database_1 = require("@database");
class PostRepository {
    async getAllPosts() {
        try {
            const result = await _database_1.client.query('SELECT * from "Posts"');
            return result;
        }
        catch (error) {
            return new Error(error);
        }
    }
}
exports.default = new PostRepository();
