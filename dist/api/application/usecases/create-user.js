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
exports.CreateUser = void 0;
const user_1 = require("../../domain/user");
class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists_user = yield this.userRepository.findByEmail(props.email);
            if (exists_user)
                throw new Error('User already registred');
            const user = user_1.User.create({
                id: null,
                name: props.name,
                email: props.email
            });
            yield this.userRepository.create(user);
        });
    }
}
exports.CreateUser = CreateUser;
