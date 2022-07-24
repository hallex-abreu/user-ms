import { UserRepository } from "../../api/application/repositories/user-repository";
import { User } from "../../api/domain/user";

export class inMemoryUserRepository implements UserRepository{
    public items: User[] = [];

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(user => user.email === email);

        if(!user)
            return null;

        return user;
    }

    async create(user: User): Promise<void> {
        this.items.push(user);
    }
}