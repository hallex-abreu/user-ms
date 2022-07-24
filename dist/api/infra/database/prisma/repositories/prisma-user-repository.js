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
exports.PrismaUserRepository = void 0;
const client_1 = require("@prisma/client");
const user_1 = require("../../../../domain/user");
class PrismaUserRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findFirst({
                where: {
                    email: email,
                }
            });
            if (!user) {
                return null;
            }
            return user_1.User.create({
                id: user.id,
                name: user.name,
                email: user.email
            });
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                }
            });
        });
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
