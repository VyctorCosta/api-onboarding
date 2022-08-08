"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postRepository_1 = __importDefault(require("@repositories/postRepository"));
const Post_1 = require("src/DTOs/Post");
class PostController {
    async getAllPosts(req, res) {
        try {
            const posts = await postRepository_1.default.getAllPosts();
            if (posts instanceof Error) {
                return res.status(400).json({ message: posts.message });
            }
            return res.status(200).json(posts.rows);
        }
        catch (error) {
            return res.sendStatus(400);
        }
    }
    async createPost(req, res) {
        const { title, description, image, text } = req.body;
        const { error } = Post_1.PostSchema.validate({ title, description, image });
    }
}
exports.default = new PostController();
