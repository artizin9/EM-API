import { prisma } from "../../config/prisma";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositorys/IUserRepository";

export class IPrimasUserRepository implements IUserRepository{
    async findUnique(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {email},
            include: { scheduling: true }
        });
        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {id},
            include: { scheduling: true }
        });
        return user;
    }

    async findMany(): Promise<User[]> {
        const users = await prisma.user.findMany({
            include: { scheduling: true }
        });
        return users;
    }

    async create(user: User): Promise<void> {
        const {name, password, email, photoURL} = user
        await prisma.user.create({
            data: {
                id: user.id ?? "",
                name,
                email,
                password,
                photoURL,
                scheduling: {
                    connect: user.Scheduling?.map(scheduling => ({id: scheduling.id})) || []
                }
            }
        });
    }

    async update(user: User): Promise<User> {
        const {name, password, email, photoURL} = user;
        const updatedUser = await prisma.user.update({
            where: {id: user.id },
            data: {
                name,
                password,
                email,
                photoURL
            }
        });

        return updatedUser;
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: {id}
        });
    }
}