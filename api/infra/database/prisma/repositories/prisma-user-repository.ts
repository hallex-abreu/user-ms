import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../../../../application/repositories/user-repository";
import { User } from "../../../../domain/user";

export class PrismaUserRepository implements UserRepository{
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {
                email: email,
            }
        });

        if (!user) {
            return null;
        }

        return User.create({
            id: user.id,
            name: user.name,
            email: user.email
        });
    }

    async create(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
            }
        });
    }
}