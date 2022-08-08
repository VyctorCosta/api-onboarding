"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _database_1 = require("@database");
const _DTOs_1 = require("@DTOs");
class UserRepository {
    async createUser(username, password, image) {
        try {
            const { error } = _DTOs_1.UserSchema.validate({ username, password, image }, { abortEarly: false });
            if (error) {
                return new Error(error.message);
            }
            const passwordEncrypted = bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync(10));
            await _database_1.client.query(`INSERT INTO "User" (id, name, password, image) VALUES (uuid_generate_v4(), $1, $2, $3)`, [username, passwordEncrypted, image]);
            return "User created";
        }
        catch (error) {
            console.log(error);
            return new Error(error);
        }
    }
    async loginUser(username, password) {
        const { error } = _DTOs_1.UserLoginSchema.validate({ username, password }, { abortEarly: false });
        if (error) {
            return new Error(error.message);
        }
        const { rows } = await _database_1.client.query('SELECT * FROM "User" WHERE name=$1', [username]);
        if (rows.length === 0) {
            return new Error("User doesn't exists!");
        }
        const user = rows[0];
        if (!bcryptjs_1.default.compareSync(password, user.password)) {
            return new Error("Incorrect password!");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.name }, process.env.SECRET_KEY, { expiresIn: "7d" });
        return { username: user.name, token };
    }
}
exports.default = new UserRepository();
