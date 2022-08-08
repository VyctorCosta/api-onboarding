"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _repositories_1 = require("@repositories");
const _database_1 = require("@database");
class UserController {
    async userPost(req, res) {
        try {
            const { username, password, image } = req.body;
            const result = await _repositories_1.userRepository.createUser(username, password, image);
            if (result instanceof Error) {
                return res.status(400).json(result.message);
            }
            return res.status(200).json({ message: result });
        }
        catch (error) {
            console.log(error);
            return res.status(400);
        }
    }
    async userLogin(req, res) {
        try {
            const { username, password, } = req.body;
            const result = await _repositories_1.userRepository.loginUser(username, password);
            if (result instanceof Error) {
                return res.status(400).json(result.message);
            }
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(400);
        }
    }
    async userGet(req, res) {
        const result = await _database_1.client.query('SELECT * from "User"');
        return res.status(200).json(result.rows);
    }
}
exports.default = new UserController();
