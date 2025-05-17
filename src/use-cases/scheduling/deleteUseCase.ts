import { ISchedulingRepository } from "../../domain/repositorys/IScheduling";
import { ServerError } from "../../shared/serverError";

export class DeleteSchedulingUseCase {
    constructor(
        private schedulingRepository: ISchedulingRepository,
    ){}

    async execute(id: string){
            const scheduling = await this.schedulingRepository.findUnique(id);
            if (!scheduling) throw new ServerError("Agendamento não encontrado", 404);

            await this.schedulingRepository.delete(id);
            return scheduling;
    }
}