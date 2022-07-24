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
const in_memory_user_repository_1 = require("../../../tests/repositories/in-memory-user-repository");
const user_1 = require("../../domain/user");
const create_user_1 = require("./create-user");
describe('Tests in create user', () => {
    it('Shold be able registred new user use case', () => __awaiter(void 0, void 0, void 0, function* () {
        const userRepository = new in_memory_user_repository_1.inMemoryUserRepository;
        const user = user_1.User.create({
            id: null,
            name: 'Hallex',
            email: 'teste@gmail.com'
        });
        const ct = new create_user_1.CreateUser(userRepository);
        yield ct.execute({
            id: null,
            name: user.name,
            email: user.email
        });
        expect(true).toBe(true);
    }));
    it('Shold be able registred user with email already in use use case', () => __awaiter(void 0, void 0, void 0, function* () {
        const userRepository = new in_memory_user_repository_1.inMemoryUserRepository;
        const user = user_1.User.create({
            id: 1,
            name: 'Hallex',
            email: 'teste@gmail.com'
        });
        const ct = new create_user_1.CreateUser(userRepository);
        yield ct.execute({
            id: null,
            name: user.name,
            email: user.email
        });
        try {
            yield ct.execute({
                id: null,
                name: user.name,
                email: user.email
            });
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        }
        catch (e) {
            expect(e.message).toBe('User already registred');
        }
    }));
});
