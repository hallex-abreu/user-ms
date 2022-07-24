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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prisma_user_repository_1 = require("../database/prisma/repositories/prisma-user-repository");
const find_user_by_email_1 = require("../../application/usecases/find-user-by-email");
const create_user_1 = require("../../application/usecases/create-user");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/healthycheck', (request, response) => {
    return response.json({ ok: true });
});
app.get('/user/:email', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = request.params;
    const prismaUserRepository = new prisma_user_repository_1.PrismaUserRepository();
    const findUserByEmail = new find_user_by_email_1.FindUserByEmail(prismaUserRepository);
    try {
        const user = yield findUserByEmail.execute(email);
        return response.status(200).json(user.props);
    }
    catch (err) {
        console.error(err);
        switch (err.message) {
            case 'User already registred':
                return response.status(400).json({
                    error: 'Does not exist user with email'
                });
                break;
            default:
                return response.status(500).json({
                    error: `Internal unmapped error: ${JSON.stringify(err)}`
                });
        }
    }
}));
app.post('/user', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = request.body;
    const prismaUserRepository = new prisma_user_repository_1.PrismaUserRepository();
    const createUser = new create_user_1.CreateUser(prismaUserRepository);
    try {
        yield createUser.execute({
            id: null,
            name,
            email,
        });
        return response.status(201).json({ message: 'Successfully registered' });
    }
    catch (err) {
        console.error(err);
        switch (err.message) {
            case 'User already registred':
                return response.status(400).json({
                    error: 'User is already registered'
                });
                break;
            default:
                return response.status(500).json({
                    error: `Internal unmapped error: ${JSON.stringify(err)}`
                });
        }
    }
}));
app.listen(process.env.PORT || 3333, () => {
    console.log(`[User] Server running ${process.env.PORT || 3333}`);
});
