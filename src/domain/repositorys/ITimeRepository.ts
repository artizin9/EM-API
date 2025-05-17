import { Time } from "../entities/time";

// CRUD operations for the Time entity
export interface ITimeRepository {
    create(time: Time): Promise<Time>;
    findUnique(id: string): Promise<Time | null>;
    findMany(): Promise<Time[]>;
    update(time: Time): Promise<Time>;
    delete(id: string): Promise<void>;
    availableTime(): Promise<Time | null>;
    findByDateAndCorporation(date: string, corporationId: string): Promise<Time | null>
}