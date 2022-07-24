import { User } from '../../domain/user';
import { UserRepository } from '../repositories/user-repository';

interface CreateUserRequest {
    id: number | null,
    name: string;
    email: string;
}

export class CreateUser{
    constructor(
        private userRepository: UserRepository
    ){}

    async execute(props: CreateUserRequest){
        const exists_user = await this.userRepository.findByEmail(props.email);

        if(exists_user)
            throw new Error('User already registred')

        const user = User.create({
            id: null,
            name: props.name,
            email: props.email
        });

        await this.userRepository.create(user);
    }
}