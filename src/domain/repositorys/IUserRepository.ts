import { User } from "../entities/user";

// CRUD operations for the Time entity
export interface IUserRepository {
    create(user: User): Promise<void>;
    findById(id: string): Promise<User | null>;
    findUnique(email: string): Promise<User | null>;
    findMany(): Promise<User[]>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<void>;
}