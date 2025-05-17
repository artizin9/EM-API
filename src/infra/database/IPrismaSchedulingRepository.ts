import { prisma } from "../../config/prisma";
import { Scheduling, Status } from "../../domain/entities/scheduling";
import { ISchedulingRepository } from "../../domain/repositorys/IScheduling";

export class IPrismaSchedulingRepository implements ISchedulingRepository {

    async findUnique(id: string): Promise<Scheduling | null> {
        const scheduling = await prisma.scheduling.findUnique({
            where: { id }
        });

        return scheduling as Scheduling;
    }

    async findMany(): Promise<Scheduling[]> {
        const scheduling = await prisma.scheduling.findMany();
        return scheduling as Scheduling[];
    }

    async findBySchedulingToTime(userId: string, timeId: string): Promise<Scheduling | null> {
        const schedulingToTime = await prisma.scheduling.findFirst({
            where: {
                timeId: timeId,
                userId: userId,
            }
        });

        return schedulingToTime as Scheduling;
    }

    async findBySchedulingCompleted(status: Status): Promise<Scheduling[] | null> {
        status = Status.completed;
        const FindBySchedulingCompleted = await prisma.scheduling.findMany({
            where: {
                status: status
            }
        })
        return FindBySchedulingCompleted as Scheduling[];
    }
    
    async create(scheduling: Scheduling): Promise<Scheduling> {
        const newScheduling = await prisma.scheduling.create({
            data: {
                id: scheduling.id ?? "",
                status: scheduling.status,
                userId: scheduling.userId,
                timeId: scheduling.timeId,
                createdAt: scheduling.createdAt,
                finishedAt: scheduling.finishedAt,
            }});

            return newScheduling as Scheduling;
        } 

    async update(scheduling: Scheduling): Promise<Scheduling> {
        const updatedScheduling = await prisma.scheduling.update({
            where: { id: scheduling.id},
            data: { status: scheduling.status, finishedAt: scheduling.finishedAt }
        });

        return updatedScheduling as Scheduling;
    }

    async delete(id: string): Promise<void> {
        await prisma.scheduling.delete({
            where: { id }
        });
    }
}