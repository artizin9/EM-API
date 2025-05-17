import { Status } from "../../domain/entities/scheduling";
import { ISchedulingRepository } from "../../domain/repositorys/IScheduling";
import { ITimeRepository } from "../../domain/repositorys/ITimeRepository";
import { IUserRepository } from "../../domain/repositorys/IUserRepository";
import { nowDataFormatPTBR } from "../../infra/provider/nowDataFormatPT-BR";
import { ServerError } from "../../shared/serverError";

export class UpdateSchedulingUseCase {
    constructor(
        private schedulingRepository: ISchedulingRepository,
        private userRepository: IUserRepository,
        private timeRepository: ITimeRepository
    ){}

    async updateStatusCompleted(id: string, userId: string, timeId: string){
        const scheduling = await this.schedulingRepository.findUnique(id);
        if (!scheduling) throw new ServerError("Agendamento não encontrado", 404);

        const user = await this.userRepository.findById(userId);
        if (!user) throw new ServerError("Usuário não encontrado", 404);

        const time = await this.timeRepository.findUnique(timeId);
        if (!time) throw new ServerError("Horário não encontrado", 404);

        scheduling.status = Status.completed;
        if (scheduling.status !== Status.completed) throw new ServerError("Não foi possivel completar o agendamento", 400);

        scheduling.finishedAt = nowDataFormatPTBR;
        if (!scheduling.finishedAt) throw new ServerError("Não houve data de finalização do agendamento", 400);

        await this.schedulingRepository.update(scheduling);
        return scheduling;
    }       

    async updateStatusCanceled(id: string, userId: string, timeId: string){
        const scheduling = await this.schedulingRepository.findUnique(id);
        if (!scheduling) throw new ServerError("Agendamento não encontrado", 404);

        const user = await this.userRepository.findById(userId);
        if (!user) throw new ServerError("Usuário não encontrado", 404);

        const time = await this.timeRepository.findUnique(timeId);
        if (!time) throw new ServerError("Horário não encontrado", 404);

        scheduling.status = Status.canceled;
        if (scheduling.status !== Status.canceled) throw new ServerError("Não foi possivel cancelar o agendamento", 400);

        scheduling.finishedAt = "O agendamento foi cancelado no dia " + nowDataFormatPTBR;
        if (!scheduling.finishedAt) throw new ServerError("Não houve data de finalização do agendamento", 400);
        
        await this.schedulingRepository.update(scheduling);
        return scheduling;
    }
}