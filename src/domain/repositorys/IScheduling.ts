import { Scheduling, Status } from "../entities/scheduling";

// CRUD operations for the Time entity
export interface ISchedulingRepository {
    create(scheduling: Scheduling): Promise<Scheduling>;
    findUnique(id: string): Promise<Scheduling | null>;
    findMany(): Promise<Scheduling[]>;
    update(scheduling: Scheduling): Promise<Scheduling>;
    delete(id: string): Promise<void>;
    findBySchedulingToTime(userId: string, timeId: string): Promise<Scheduling | null>;
    findBySchedulingCompleted(status: Status): Promise<Scheduling[] | null>;
}