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
const find_user_by_email_1 = require("./find-user-by-email");
describe('Tests in list user width email', () => {
    it('Shold be able list user with email', () => __awaiter(void 0, void 0, void 0, function* () {
        const userRepository = new in_memory_user_repository_1.inMemoryUserRepository;
        const user = user_1.User.create({
            id: null,
            name: 'Hallex',
            email: 'teste@gmail.com'
        });
        const ctc = new create_user_1.CreateUser(userRepository);
        yield ctc.execute({
            id: null,
            name: user.name,
            email: user.email
        });
        const ct = new find_user_by_email_1.FindUserByEmail(userRepository);
        const exist = yield ct.execute(user.email);
        expect(exist).toBeTruthy();
    }));
    it('Should try to list a user without email', () => __awaiter(void 0, void 0, void 0, function* () {
        const userRepository = new in_memory_user_repository_1.inMemoryUserRepository;
        const user = user_1.User.create({
            id: null,
            name: 'Hallex',
            email: 'teste@gmail.com'
        });
        const ct = new find_user_by_email_1.FindUserByEmail(userRepository);
        try {
            yield ct.execute(user.email);
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        }
        catch (e) {
            expect(e.message).toBe('Does not exist user with email');
        }
    }));
});
