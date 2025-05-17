import { randomUUID } from "crypto";
import { ISchedulingRepository } from "../../domain/repositorys/IScheduling";
import { ITimeRepository } from "../../domain/repositorys/ITimeRepository";
import { IUserRepository } from "../../domain/repositorys/IUserRepository";
import { ServerError } from "../../shared/serverError";
import { Scheduling, Status } from "../../domain/entities/scheduling";
import { nowDataFormatPTBR } from "../../infra/provider/nowDataFormatPT-BR";

export class CreateSchedulingUseCase {
    constructor( 
        private schedulingRepository: ISchedulingRepository, 
        private userRepository: IUserRepository,
        private timeRepository: ITimeRepository
    ){}

    async execute(userId: string, timeId: string){
        const user = await this.userRepository.findById(userId);
        if (!user) throw new ServerError("Usuário não encontrado", 404);

        const time = await this.timeRepository.findUnique(timeId);
        if (!time) throw new ServerError("Horário não encontrado", 404);

        const scheduling = await this.schedulingRepository.findBySchedulingToTime(userId, timeId);
        if (scheduling) throw new ServerError("Horário já agendado", 400);

        const id = randomUUID();
        const createdAt = nowDataFormatPTBR;
        
        const newScheduling = new Scheduling(Status.pending, userId, timeId, createdAt, undefined, id);
        await this.schedulingRepository.create(newScheduling);

        return newScheduling;
    }
}