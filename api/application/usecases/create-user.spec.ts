import { inMemoryUserRepository } from "../../../tests/repositories/in-memory-user-repository";
import { User } from "../../domain/user";
import { CreateUser } from './create-user';

describe('Tests in create user', () => {
    it('Shold be able registred new user use case', async () => {
        const userRepository = new inMemoryUserRepository;

        const user = User.create({
            id: null,
            name: 'Hallex',
            email: 'teste@gmail.com'
        });

        const ct = new CreateUser(
            userRepository
        );

        await ct.execute({
            id: null,
            name: user.name,
            email: user.email
        });

        expect(true).toBe(true);
    });

    it('Shold be able registred user with email already in use use case', async () => {
        const userRepository = new inMemoryUserRepository;

        const user = User.create({
            id: 1,
            name: 'Hallex',
            email: 'teste@gmail.com'
        });

        const ct = new CreateUser(
            userRepository
        );

        await ct.execute({
            id: null,
            name: user.name,
            email: user.email
        });

        try {
            await ct.execute({
                id: null,
                name: user.name,
                email: user.email
            });
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e: any) {
            expect(e.message).toBe('User already registred');
        }
    });
});