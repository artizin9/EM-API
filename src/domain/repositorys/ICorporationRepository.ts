import { Corporation } from "../entities/corporation";

// CRUD operations for the Time entity
export interface ICorporationRepository {
    create(corporation: Corporation): Promise<Corporation>;
    findUnique(email: string): Promise<Corporation | null>;
    findCNPJ(cnpj: string): Promise<Corporation | null>;
    findById(id: string): Promise<Corporation | null>;
    findMany(): Promise<Corporation[]>;
    update(corporation: Corporation): Promise<Corporation>;
    delete(id: string): Promise<void>;
}