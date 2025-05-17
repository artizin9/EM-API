import { prisma } from "../../config/prisma";
import { Corporation } from "../../domain/entities/corporation";
import { ICorporationRepository } from "../../domain/repositorys/ICorporationRepository";

export class IPrismaCorporationRepository implements ICorporationRepository {
    async findUnique(email: string): Promise<Corporation | null> {
        const corporation = await prisma.corporation.findUnique({
            where: { email},
            include: {
                times: true,
            }
        });
        return corporation;
    }

    async findCNPJ(cnpj: string): Promise<Corporation | null> {
        const corporation = await prisma.corporation.findUnique({
            where: { cnpj },
            include: {
                times: true,
            }
        });
        return corporation;
    }

    async findById(id: string): Promise<Corporation | null> {
        const corporation = await prisma.corporation.findUnique({
            where: { id },
            include: {
                times: true,
            }
        });
        return corporation;
    }

    async findMany(): Promise<Corporation[]> {
        const corporations = await prisma.corporation.findMany({
            include: {
                times: true,
            }
        });
        return corporations;
    }

    async create(corporation: Corporation): Promise<Corporation> {
        const { cnpj, email, name, password, photoURL, place } = corporation;
        const Corporation = await prisma.corporation.create({
            data: {
                id: corporation.id ?? "",
                cnpj,
                email,
                name,
                password,
                photoURL,
                place: place.trim(),
                times: {
                    connect: corporation.times?.map(time => ({ id: time.id })) || []
                }
            }
        });
        
        return Corporation;
    }

    async update(corporation: Corporation): Promise<Corporation> {
        const { cnpj, email, name, password, photoURL, place } = corporation;
        const updatedCorporation = await prisma.corporation.update({
            where: { id: corporation.id },
            data: {
                cnpj,
                email,
                name,
                password,
                photoURL,
                place
            }
        });

        return updatedCorporation;
    }

    async delete(id: string): Promise<void> {
        await prisma.corporation.delete({
            where: { id }
        });
    }
}