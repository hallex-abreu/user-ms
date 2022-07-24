import { UserRepository } from '../repositories/user-repository';

export class FindUserByEmail{
    constructor(
        private userRepository: UserRepository
    ){}

    async execute(email: string){
        const user = await this.userRepository.findByEmail(email);

        if(!user)
            throw new Error('Does not exist user with email')

        return user;    
    }
}