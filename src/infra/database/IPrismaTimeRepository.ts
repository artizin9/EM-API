import { prisma } from "../../config/prisma";
import { Time } from "../../domain/entities/time";
import { ITimeRepository } from "../../domain/repositorys/ITimeRepository";

export class IPrismaTimeRepository implements ITimeRepository {
    async findUnique(id: string): Promise<Time | null> {
        const time = await prisma.time.findUnique({
            where: { id },
            include: { scheduling: true }
        });

        return time;
    }

    async findByDateAndCorporation(date: string, corporationId: string): Promise<Time | null> {
        const time = await prisma.time.findFirst({
            where: { date, corporationId }
        });

        return time;
    }
    
    async findMany(): Promise<Time[]> {
        const times = await prisma.time.findMany({
            include: { scheduling: true }
        });

        return times;
    }

    async availableTime(): Promise<Time | null> {
        const time = await prisma.time.findFirst({
            where: { scheduling: null },
        });

        return time;
    }


    async create(time: Time): Promise<Time> {
        const { id, date, corporationId } = time;
        const newTime = await prisma.time.create({
            data: {
                id: id ?? "",
                date,
                corporationId: corporationId ?? ""
            }
        });
        
        return newTime;
    }

    async update(time: Time): Promise<Time> {
        const { id, date } = time;
        const updatedTime = await prisma.time.update({
            where: { id },
            data: { date }
        });

        return updatedTime;
    }

    async delete(id: string): Promise<void> {
        await prisma.time.delete({
            where: { id }
        });
    }
}