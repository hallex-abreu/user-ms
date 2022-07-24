import { inMemoryUserRepository } from "../../../tests/repositories/in-memory-user-repository";
import { User } from "../../domain/user";
import { CreateUser } from './create-user';
import { FindUserByEmail } from './find-user-by-email';

describe('Tests in list user width email', () => {
    it('Shold be able list user with email', async () => {
        const userRepository = new inMemoryUserRepository;

        const user = User.create({
            id: null,
            name: 'Hallex',
            email: 'teste@gmail.com'
        });

        const ctc = new CreateUser(
            userRepository
        );

        await ctc.execute({
            id: null,
            name: user.name,
            email: user.email
        });

        const ct = new FindUserByEmail(
            userRepository
        );

        const exist = await ct.execute(user.email);

        expect(exist).toBeTruthy();
    });

    it('Should try to list a user without email', async () => {
        const userRepository = new inMemoryUserRepository;

        const user = User.create({
            id: null,
            name: 'Hallex',
            email: 'teste@gmail.com'
        });

        const ct = new FindUserByEmail(
            userRepository
        );

        try {
            await ct.execute(user.email);
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e: any) {
            expect(e.message).toBe('Does not exist user with email');
        }
    });
});